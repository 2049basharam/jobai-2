import { z } from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB limit

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export interface FileValidationError {
  code:
    | 'FILE_SIZE_EXCEEDED'
    | 'UNSUPPORTED_EXTENSION'
    | 'UNSUPPORTED_MIME_TYPE'
    | 'MAGIC_BYTE_MISMATCH'
    | 'EMPTY_FILE'
    | 'CORRUPTED_FILE';
  message: string;
}

export const documentUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  fileSize: z.number().max(MAX_FILE_SIZE, 'File size exceeds 5MB limit'),
  mimeType: z.string().refine((val) => ALLOWED_MIME_TYPES.includes(val), {
    message: 'File type must be PDF (.pdf), Word (.docx), or Text (.txt)',
  }),
});

/**
 * Client-Side Validation Pre-check
 */
export function validateClientFile(file: File): FileValidationError | null {
  if (!file) {
    return { code: 'EMPTY_FILE', message: 'No file selected' };
  }

  if (file.size === 0) {
    return { code: 'EMPTY_FILE', message: 'File is empty (0 bytes)' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      code: 'FILE_SIZE_EXCEEDED',
      message: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 5 MB limit`,
    };
  }

  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      code: 'UNSUPPORTED_EXTENSION',
      message: `Unsupported file extension (${ext}). Please upload a .pdf, .docx, or .txt resume.`,
    };
  }

  return null;
}

/**
 * Server-Side Magic-Byte Security Inspection
 */
export async function validateMagicBytes(buffer: ArrayBuffer, filename: string): Promise<FileValidationError | null> {
  if (!buffer || buffer.byteLength === 0) {
    return { code: 'EMPTY_FILE', message: 'Document buffer is empty' };
  }

  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  const bytes = new Uint8Array(buffer.slice(0, 8));

  // PDF Magic Bytes: %PDF- (0x25 0x50 0x44 0x46)
  if (ext === '.pdf') {
    const isPdfHeader = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
    if (!isPdfHeader) {
      return {
        code: 'MAGIC_BYTE_MISMATCH',
        message: 'File extension is .pdf but header magic bytes do not match valid PDF format.',
      };
    }
  }

  // DOCX Magic Bytes (ZIP container header): PK\x03\x04 (0x50 0x4B 0x03 0x04)
  if (ext === '.docx') {
    const isZipHeader = bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
    if (!isZipHeader) {
      return {
        code: 'MAGIC_BYTE_MISMATCH',
        message: 'File extension is .docx but file header does not match valid OpenXML Word document format.',
      };
    }
  }

  return null;
}

/**
 * Sanitizes unsafe filenames to prevent path traversal
 */
export function sanitizeFilename(filename: string): string {
  const nameWithoutPath = filename.replace(/^.*[\\/]/, '');
  return nameWithoutPath.replace(/[^a-zA-Z0-9_.-]/g, '_');
}
