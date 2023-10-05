
// Função para calcular e exibir a análise financeira e DRE
function calculateAndDisplayAnalysis() {
    const ativosCirculantes = parseFloat(document.getElementById("ativosCirculantes").value);
    const ativosNaoCirculantes = parseFloat(document.getElementById("ativosNaoCirculantes").value);
    const passivosCirculantes = parseFloat(document.getElementById("passivosCirculantes").value);
    const passivosNaoCirculantes = parseFloat(document.getElementById("passivosNaoCirculantes").value);
    const patrimonioLiquido = parseFloat(document.getElementById("patrimonioLiquido").value);
    const receitaBruta = parseFloat(document.getElementById("receitaBruta").value);
    const cpv = parseFloat(document.getElementById("cpv").value);
    const despesasOperacionais = parseFloat(document.getElementById("despesasOperacionais").value);
    const outrasReceitas = parseFloat(document.getElementById("outrasReceitas").value);
    const outrasDespesas = parseFloat(document.getElementById("outrasDespesas").value);

    let analysisText = "";

    // Cálculos e análises do balanço financeiro
    const liquidezCorrente = ativosCirculantes / passivosCirculantes;
    analysisText += liquidezCorrente > 1 ? 
        "A Liquidez Corrente é superior a 1, indicando que a empresa possui uma boa capacidade para cumprir com suas obrigações de curto prazo.\n" : 
        "A Liquidez Corrente é inferior a 1, representando um risco para a solvência de curto prazo da empresa.\n";

    const endividamentoGeral = (passivosCirculantes + passivosNaoCirculantes) / (ativosCirculantes + ativosNaoCirculantes);
    analysisText += endividamentoGeral < 0.5 ? 
        "O Endividamento Geral é menor que 50%, o que é geralmente considerado saudável e indica uma menor dependência de dívidas para financiar as operações.\n" : 
        "O Endividamento Geral é maior ou igual a 50%, o que pode ser uma bandeira vermelha para os investidores e credores, indicando uma alta dependência de financiamento externo.\n";

    // Cálculos e análises da DRE
    const margemBruta = (receitaBruta - cpv) / receitaBruta;
    analysisText += margemBruta > 0.2 ? 
        "A Margem Bruta é superior a 20%, o que pode indicar uma vantagem competitiva na produção ou venda de seus produtos.\n" : 
        "A Margem Bruta é inferior a 20%, o que pode sinalizar problemas na estrutura de custos ou na estratégia de preços da empresa.\n";

    const margemOperacional = (receitaBruta - cpv - despesasOperacionais) / receitaBruta;
    analysisText += margemOperacional > 0.1 ? 
        "A Margem Operacional é superior a 10%, sugerindo que a empresa é capaz de controlar eficazmente seus custos operacionais.\n" : 
        "A Margem Operacional é inferior a 10%, indicando que a empresa pode estar enfrentando desafios para manter seus custos operacionais sob controle.\n";

    // Atualizando o texto da análise na página
    document.getElementById("analysis").innerText = analysisText;
}

function exportToPDF() {
    // Obtendo todo o conteúdo do div 'container' onde estão os inputs e a análise
    var element = document.getElementById('container');
    
    var opt = {
        margin: 10,
        filename: 'analise_financeira.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Geração do PDF
    html2pdf().from(element).set(opt).save();
}



// Adicionando event listener para os botões
document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyzeButton');
    if (analyzeButton) {
        analyzeButton.addEventListener('click', calculateAndDisplayAnalysis);
    }

    const exportButton = document.getElementById('exportButton');
    if (exportButton) {
        exportButton.addEventListener('click', exportToPDF);
    }
});
