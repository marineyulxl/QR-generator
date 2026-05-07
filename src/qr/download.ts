export function triggerDownload(data: Blob | string, fileName: string, mime: string): void {
  const blob =
    typeof data === 'string' ? new Blob([data], { type: mime }) : new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
