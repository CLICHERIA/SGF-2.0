// exporter.js — helper para export CSV/XLSX (usa SheetJS já carregado na página)
export function exportToCSV(dataArray, filename = 'export.csv') {
  // transforma para planilha tabular
  const headers = ['id','tipo','nfe','sv','nome','dataRegistro','estado','localizacao','responsavel'];
  const rows = dataArray.map(item => headers.map(h => item[h] || ''));
  const csv = [headers.join(','), ...rows.map(r => r.map(s => `"${String(s).replace(/"/g,'""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportToXLSX(dataArray, filename = 'export.xlsx') {
  const headers = ['id','tipo','nfe','sv','nome','dataRegistro','estado','localizacao','responsavel'];
  const ws_data = [headers, ...dataArray.map(item => headers.map(h => item[h] || ''))];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, 'Ferramentais');
  const wbout = XLSX.write(wb, { bookType:'xlsx', type:'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
