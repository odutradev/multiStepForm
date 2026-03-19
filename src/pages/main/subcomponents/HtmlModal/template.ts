export const generatePrecatorioHtml = (data: Record<string, unknown>): string => {
  const getVal = (key: string) => (data[key] ? String(data[key]) : '-');

  const renderField = (label: string, value: string) => `
    <div style="margin-bottom: 12px; font-family: Arial, sans-serif;">
      <strong style="font-weight: 600; font-size: 14px; color: #64748b; margin-right: 8px;">${label}</strong>
      <span style="font-size: 15px; font-weight: 500; color: #1e293b;">${value}</span>
    </div>
  `;

  const renderRadioGroup = (label: string, options: { label: string; checked: boolean }[]) => {
    const radiosHtml = options
      .map(
        (opt) => `
      <span style="display: inline-block; margin-right: 16px; font-size: 14px; color: #1e293b; white-space: nowrap;">
        <span style="font-weight: bold; margin-right: 4px;">(${opt.checked ? ' X ' : '&nbsp;&nbsp;&nbsp;'})</span>
        <span style="vertical-align: middle;">${opt.label}</span>
      </span>`
      )
      .join('');

    return `
      <div style="margin-bottom: 12px; font-family: Arial, sans-serif;">
        <strong style="font-weight: 600; font-size: 14px; color: #64748b; margin-right: 12px; display: inline-block; vertical-align: middle;">${label}</strong>
        <span style="display: inline-block; vertical-align: middle;">
          ${radiosHtml}
        </span>
      </div>
    `;
  };

  const renderSection = (title: string) => `
    <h3 style="font-size: 16px; background-color: #f1f5f9; padding: 10px; margin: 24px 0 16px 0; border-radius: 4px; color: #1e293b; font-family: Arial, sans-serif;">
      ${title}
    </h3>
  `;

  const procs = Array.isArray(data.listaProcuradoresAdicionados) ? data.listaProcuradoresAdicionados : [];
  const procuradoresHtml = procs
    .map(
      (p) => `
    <tr>
      <td style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">${p.nome || '-'}</td>
      <td style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">${p.documento || '-'}</td>
      <td style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">${p.oab || '-'}</td>
    </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ofício Precatório n. 1806</title>
</head>
<body style="font-family: Arial, sans-serif; color: #1e293b; background-color: #f8fafc; padding: 32px; margin: 0;">
<main style="max-width: 900px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  
  <div style="text-align: center; margin-bottom: 32px; padding-bottom: 32px; border-bottom: 2px solid #e2e8f0; font-family: Arial, sans-serif;">
    <h1 style="font-size: 20px; margin: 0 0 8px 0; color: #1e293b;">Poder Judiciário do Estado de Minas Gerais - Tribunal de Justiça</h1>
    <h2 style="font-size: 18px; margin: 0 0 8px 0; color: #1e293b;">OFÍCIO PRECATÓRIO n. 1806</h2>
    <p style="margin: 0 0 4px 0; color: #1e293b;"><strong>VERSÃO 20-02-2020</strong></p>
    <small style="color: #64748b; font-size: 12px;">* De acordo com a Resolução nº 303/2019 do Conselho Nacional de Justiça</small>
  </div>

  <div style="margin-bottom: 32px;">
    ${renderField('Juiz(a) da Execução:', getVal('nomeMagistrado'))}
    ${renderField('Vara/Cartório:', getVal('nomeVaraRequisicao'))}
    <div style="margin-top: 16px; font-family: Arial, sans-serif; color: #1e293b; line-height: 1.5;">
      <p style="margin: 0 0 8px 0;">Exmo(a). Senhor(a) Presidente do Tribunal de Justiça do Estado de Minas Gerais,</p>
      <p style="margin: 0;">Requisito o pagamento em favor do(s) beneficiário(s), no(s) valor(es) individualizado(s), em virtude de decisão transitada em julgado, segundo as informações abaixo indicadas. Informo, outrossim, que não existe qualquer recurso pendente quanto aos valores contidos na presente Requisição.</p>
    </div>
  </div>

  ${renderSection('1. INFORMAÇÕES PROCESSUAIS')}
  ${renderField('1.1 Numeração única do processo judicial (Art. 60, 1):', getVal('numeroUnicoCnj'))}
  ${renderField('1.2 Número originário anterior, se houver (Art. 60, 1):', getVal('numeroProcessoOriginario'))}
  ${renderRadioGroup('1.3 Houve processo de conhecimento?', [
    { label: 'Sim', checked: getVal('houveProcessoConhecimento') === 'Sim' },
    { label: 'Não', checked: getVal('houveProcessoConhecimento') === 'Não' }
  ])}
  ${renderRadioGroup('1.4 Houve embargos à execução ou impugnação ao cálculo no cumprimento de sentença?', [
    { label: 'Sim', checked: getVal('houveEmbargosExecucao') === 'Sim' },
    { label: 'Não', checked: getVal('houveEmbargosExecucao') === 'Não' }
  ])}
  ${renderField('1.4.1 Data do decurso de prazo para apresentação dos embargos à execução (Art. 60, VII):', getVal('dataDecursoPrazoEmbargos'))}

  ${renderSection('2. INFORMAÇÕES PERTINENTES À REQUISIÇÃO')}
  ${renderRadioGroup('2.1 NATUREZA DO CRÉDITO (Art. 20, II, art. 6º, III):', [
    { label: 'Comum', checked: getVal('naturezaCredito') === 'Comum' },
    { label: 'Alimentar/Preferencial', checked: getVal('naturezaCredito') === 'Alimentar' }
  ])}
  ${renderField('2.2 Assunto a que se refere a requisição (Art. 6°, X):', `Codigo nº: ${getVal('codigoAssuntoProcesso')} | Assunto: ${getVal('descricaoAssuntoProcesso')}`)}
  ${renderRadioGroup('2.3 Ação de natureza salarial (Art. 60, XII)?', [
    { label: 'Sim', checked: getVal('possuiNaturezaSalarial') === 'Sim' },
    { label: 'Não', checked: getVal('possuiNaturezaSalarial') === 'Não' }
  ])}
  ${renderRadioGroup('2.4 Requisição:', [
    { label: 'Parcial', checked: getVal('tipoRequisicao') === 'Parcial' },
    { label: 'Complementar', checked: getVal('tipoRequisicao') === 'Complementar' },
    { label: 'Suplementar', checked: getVal('tipoRequisicao') === 'Suplementar' },
    { label: 'Original', checked: getVal('tipoRequisicao') === 'Original' }
  ])}
  ${renderField('2.5 Data da intimação das partes quanto ao inteiro teor do Formulário Ofício Precatório:', getVal('dataIntimacaoPartes'))}
  ${renderRadioGroup('2.6 O crédito foi objeto de cessão?', [
    { label: 'SIM', checked: getVal('houveCessaoCreditoPrincipal') === 'Sim' },
    { label: 'NÃO', checked: getVal('houveCessaoCreditoPrincipal') === 'Não' }
  ])}
  ${renderRadioGroup('2.7 O crédito foi objeto de penhora?', [
    { label: 'SIM', checked: getVal('houvePenhoraCreditoPrincipal') === 'Sim' },
    { label: 'NÃO', checked: getVal('houvePenhoraCreditoPrincipal') === 'Não' }
  ])}
  ${renderRadioGroup('2.8 O crédito principal foi objeto de sucessão?', [
    { label: 'SIM', checked: getVal('houveSucessaoCreditoPrincipal') === 'Sim' },
    { label: 'NÃO', checked: getVal('houveSucessaoCreditoPrincipal') === 'Não' }
  ])}

  ${renderSection('3. INFORMAÇÕES SOBRE O DEVEDOR')}
  ${renderField('3.1 ENTIDADE DEVEDORA / ENTE DEVEDOR (Art. 20, IV, V):', getVal('entidadeDevedora'))}
  ${renderField('3.2 CNPJ:', getVal('cnpjEntidadeDevedora'))}

  ${renderSection('4. INFORMAÇÕES SOBRE O BENEFICIÁRIO PRINCIPAL')}
  ${renderField('4.1 Nome do beneficiário principal:', getVal('nomeBeneficiario'))}
  ${renderField('4.2 Nome social, se for o caso:', getVal('nomeSocialBeneficiario'))}
  ${renderField('4.3 CPF/CNPJ ou RNE N°:', getVal('numeroDocumentoBeneficiario'))}
  ${renderField('4.4 PIS/PASEP ou NIT N°:', getVal('numeroInscricaoSocial'))}
  ${renderField('4.5 Data de nascimento (Art. 6º, IX):', getVal('dataNascimentoBeneficiario'))}

  ${renderRadioGroup('4.6 O beneficiário:', [
    { label: 'Possui doença grave', checked: getVal('possuiDoencaGrave') === 'Sim' },
    { label: 'É pessoa com deficiência', checked: getVal('possuiDeficiencia') === 'Sim' },
    { label: 'Beneficiário de crédito por decisão judicial', checked: getVal('possuiCreditoPreferencial') === 'Sim' },
    { label: 'Não se aplica', checked: getVal('possuiDoencaGrave') !== 'Sim' && getVal('possuiDeficiencia') !== 'Sim' && getVal('possuiCreditoPreferencial') !== 'Sim' }
  ])}

  ${renderRadioGroup('4.7 O beneficiário:', [
    { label: 'Incapaz', checked: getVal('condicaoCapacidadeBeneficiario') === 'Incapaz' },
    { label: 'Espólio', checked: getVal('condicaoCapacidadeBeneficiario') === 'Espolio' },
    { label: 'Massa Falida', checked: getVal('condicaoCapacidadeBeneficiario') === 'MassaFalida' },
    { label: 'Menor', checked: getVal('condicaoCapacidadeBeneficiario') === 'Menor' },
    { label: 'Não se aplica', checked: getVal('condicaoCapacidadeBeneficiario') === 'NaoSeAplica' }
  ])}

  ${renderRadioGroup('4.8 Deseja informar dados bancários:', [
    { label: 'Sim', checked: !!data.codigoBancoTitular },
    { label: 'Não', checked: !data.codigoBancoTitular }
  ])}

  ${renderRadioGroup('4.8.1 Titular da conta:', [
    { label: 'Beneficiário do crédito', checked: getVal('titularContaBancaria') === 'BeneficiarioCredito' },
    { label: 'Representante Legal', checked: getVal('titularContaBancaria') === 'RepresentanteLegal' }
  ])}

  ${renderField('4.8.2 CPF/CNPJ ou RNE N°:', getVal('cpfTitularBancario') || getVal('cnpjTitularBancario') || getVal('rneTitularBancario'))}
  ${renderField('4.8.3 Banco:', getVal('codigoBancoTitular'))}
  ${renderField('4.8.4 Agência:', getVal('agenciaBancariaTitular'))}

  <div style="margin-bottom: 12px; font-family: Arial, sans-serif;">
    <strong style="font-weight: 600; font-size: 14px; color: #64748b; margin-right: 8px; vertical-align: middle;">4.8.5 Conta N°:</strong>
    <span style="font-size: 15px; font-weight: 500; color: #1e293b; vertical-align: middle; margin-right: 16px;">${getVal('numeroContaBancariaTitular')}</span>
    <span style="display: inline-block; vertical-align: middle;">
      <span style="display: inline-block; margin-right: 16px; font-size: 14px; color: #1e293b;">
        <span style="font-weight: bold; margin-right: 4px;">(${getVal('tipoContaBancariaTitular') === 'Corrente' ? ' X ' : '&nbsp;&nbsp;&nbsp;'})</span> Corrente
      </span>
      <span style="display: inline-block; margin-right: 16px; font-size: 14px; color: #1e293b;">
        <span style="font-weight: bold; margin-right: 4px;">(${getVal('tipoContaBancariaTitular') === 'Poupanca' ? ' X ' : '&nbsp;&nbsp;&nbsp;'})</span> Poupança
      </span>
    </span>
  </div>

  <div style="margin-bottom: 24px; font-family: Arial, sans-serif;">
    <strong style="font-weight: 600; font-size: 14px; color: #64748b; display: block; margin-bottom: 8px;">4.9 Procurador ou escritório de advocacia que representa o beneficiário:</strong>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; text-align: left;">
      <thead>
        <tr style="background-color: #f8fafc;">
          <th style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">Nome</th>
          <th style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">CPF/CNPJ/RNE</th>
          <th style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">OAB</th>
        </tr>
      </thead>
      <tbody>
        ${procuradoresHtml || '<tr><td colspan="3" style="border: 1px solid #e2e8f0; padding: 8px 16px; text-align: center; font-size: 14px;">-</td></tr>'}
      </tbody>
    </table>
  </div>

  ${renderField('4.10.1 Valor Bruto:', getVal('valorBrutoTotal'))}
  ${renderField('4.10.2 Valor principal corrigido:', getVal('valorPrincipalCorrigido'))}
  ${renderField('4.10.3 Data-base (Art. 2º, VI):', getVal('dataLiquidacaoCalculo'))}
  
  ${renderRadioGroup('4.10.4 Haverá incidência de contribuições sobre o crédito, no momento do pagamento?', [
    { label: 'Sim', checked: getVal('possuiDescontoPrevidenciario') === 'Sim' },
    { label: 'Não', checked: getVal('possuiDescontoPrevidenciario') === 'Não' }
  ])}

  ${renderRadioGroup('4.10.5 Existe incidência de juros moratórios?', [
    { label: 'Sim', checked: getVal('possuiJurosMoratorios') === 'Sim' },
    { label: 'Não', checked: getVal('possuiJurosMoratorios') === 'Não' }
  ])}

  ${renderRadioGroup('4.10.6 Existe Incidência de juros compensatórios (remuneratórios)?', [
    { label: 'Sim', checked: getVal('possuiJurosCompensatorios') === 'Sim' },
    { label: 'Não', checked: getVal('possuiJurosCompensatorios') === 'Não' }
  ])}

  ${renderRadioGroup('4.10.7 Haverá Incidência de ITCD?', [
    { label: 'Sim', checked: getVal('possuiIncidenciaItcd') === 'Sim' },
    { label: 'Não', checked: getVal('possuiIncidenciaItcd') === 'Não' }
  ])}

  ${renderRadioGroup('4.10.8 Há tributação RRA a título de imposto de renda?', [
    { label: 'Sim', checked: getVal('possuiTributacaoRra') === 'Sim' },
    { label: 'Não', checked: getVal('possuiTributacaoRra') === 'Não' }
  ])}

  ${renderSection('5. ASSINATURAS')}
  <div style="min-height: 100px; border: 1px dashed #e2e8f0; margin-top: 16px; text-align: center; padding: 32px; font-family: Arial, sans-serif;">
    <span style="color: #94a3b8; font-size: 14px; font-weight: 600;">[Área reservada para assinaturas]</span>
  </div>

</main>
</body>
</html>`;
};
