/**
 * AMD Agro — SC5 & ZM-GROW
 * Google Apps Script: Webhook para receber leads e registrar na planilha
 * 
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 * 1. Acesse https://script.google.com e crie um novo projeto
 * 2. Cole este código no editor
 * 3. Substitua SHEET_ID pelo ID da sua planilha Google Sheets
 *    (o ID está na URL: https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit)
 * 4. Clique em "Implantar" > "Nova implantação"
 * 5. Tipo: "App da Web"
 * 6. Executar como: "Eu"
 * 7. Quem tem acesso: "Qualquer pessoa"
 * 8. Clique em "Implantar" e copie a URL gerada
 * 9. Cole a URL no campo GOOGLE_SHEETS_WEBHOOK_URL no painel de Secrets do projeto AMD Agro
 */

const SHEET_ID = "SEU_ID_DA_PLANILHA_AQUI"; // Substitua pelo ID real
const SHEET_NAME = "Leads"; // Nome da aba na planilha

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Criar aba se não existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Cabeçalhos
      sheet.appendRow([
        "ID", "Produto", "Nome", "WhatsApp", "Cultura", 
        "Hectares", "Problema", "Data/Hora"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Formatar data
    const dataFormatada = new Date(data.data).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo"
    });
    
    // Adicionar linha com os dados do lead
    sheet.appendRow([
      data.id,
      data.produto === "sc5" ? "SC5 Condicionador de Solo" : "ZM-GROW Biofertilizante",
      data.nome,
      data.whatsapp,
      data.cultura || "—",
      data.hectares || "—",
      data.problema || "—",
      dataFormatada
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (execute manualmente para verificar)
function testarWebhook() {
  const testData = {
    id: 999,
    produto: "sc5",
    nome: "Teste Silva",
    whatsapp: "(11) 99999-9999",
    cultura: "Soja",
    hectares: "100",
    problema: "Fósforo alto na análise mas planta deficiente",
    data: new Date().toISOString()
  };
  
  const e = { postData: { contents: JSON.stringify(testData) } };
  const result = doPost(e);
  Logger.log(result.getContent());
}
