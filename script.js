async function buscarFeriados() {
    const ano = document.getElementById('ano').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (!ano || isNaN(ano)) {
        resultadoDiv.innerHTML = '<p class="erro">Por favor, insira um ano válido.</p>';
        return;
    }

    try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const feriados = await response.json();

        if (feriados.length === 0) {
            resultadoDiv.innerHTML = `<p class="erro">Nenhum feriado encontrado para o ano ${ano}.</p>`;
            return;
        }

        feriados.forEach(feriado => {
            const divFeriado = document.createElement('div');
            divFeriado.className = 'feriado';
            divFeriado.innerHTML = `
                <strong>${feriado.name}</strong><br>
                Data: ${formatarData(feriado.date)}<br>
                Tipo: ${feriado.type}
            `;
            resultadoDiv.appendChild(divFeriado);
        });
    } catch (error) {
        console.error('Erro ao consumir a API:', error);
        resultadoDiv.innerHTML = '<p class="erro">Erro ao carregar os feriados. Tente novamente mais tarde.</p>';
    }
}

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

