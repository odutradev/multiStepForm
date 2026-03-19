export const generateDocumentHtml = (data: Record<string, unknown>): string => {
  const getFieldValue = (key: string) => (data[key] ? String(data[key]) : '-');

  const renderDataField = (label: string, value: string) => `
    <div style="margin-bottom: 12px; font-family: Arial, sans-serif;">
      <strong style="font-weight: 600; font-size: 14px; color: #64748b; margin-right: 8px;">${label}</strong>
      <span style="font-size: 15px; font-weight: 500; color: #1e293b;">${value}</span>
    </div>
  `;

  const renderRadioSelection = (label: string, options: { label: string; isChecked: boolean }[]) => {
    const radioItemsHtml = options
      .map(
        (option) => `
      <span style="display: inline-block; margin-right: 16px; font-size: 14px; color: #1e293b; white-space: nowrap;">
        <span style="font-weight: bold; margin-right: 4px;">(${option.isChecked ? ' X ' : '&nbsp;&nbsp;&nbsp;'})</span>
        <span style="vertical-align: middle;">${option.label}</span>
      </span>`
      )
      .join('');

    return `
      <div style="margin-bottom: 12px; font-family: Arial, sans-serif;">
        <strong style="font-weight: 600; font-size: 14px; color: #64748b; margin-right: 12px; display: inline-block; vertical-align: middle;">${label}</strong>
        <span style="display: inline-block; vertical-align: middle;">
          ${radioItemsHtml}
        </span>
      </div>
    `;
  };

  const renderSectionHeader = (title: string) => `
    <h3 style="font-size: 16px; background-color: #f1f5f9; padding: 10px; margin: 24px 0 16px 0; border-radius: 4px; color: #1e293b; font-family: Arial, sans-serif;">
      ${title}
    </h3>
  `;

  const representativesList = Array.isArray(data.listaProcuradoresAdicionados) ? data.listaProcuradoresAdicionados : [];
  const representativesHtml = representativesList
    .map(
      (representative) => `
    <tr>
      <td style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">${representative.nome || '-'}</td>
      <td style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">${representative.documento || '-'}</td>
      <td style="border: 1px solid #e2e8f0; padding: 8px 16px; font-size: 14px; color: #1e293b;">${representative.oab || '-'}</td>
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
    ${renderDataField('Juiz(a) da Execução:', getFieldValue('nomeMagistrado'))}
    ${renderDataField('Vara/Cartório:', getFieldValue('nomeVaraRequisicao'))}
    <div style="margin-top: 16px; font-family: Arial, sans-serif; color: #1e293b; line-height: 1.5;">
      <p style="margin: 0 0 8px 0;">Exmo(a). Senhor(a) Presidente do Tribunal de Justiça do Estado de Minas Gerais,</p>
      <p style="margin: 0;">Requisito o pagamento em favor do(s) beneficiário(s), no(s) valor(es) individualizado(s), em virtude de decisão transitada em julgado, segundo as informações abaixo indicadas. Informo, outrossim, que não existe qualquer recurso pendente quanto aos valores contidos na presente Requisição.</p>
    </div>
  </div>

  ${renderSectionHeader('1. INFORMAÇÕES PROCESSUAIS')}
  ${renderDataField('1.1 Numeração única do processo judicial (Art. 60, 1):', getFieldValue('numeroUnicoCnj'))}
  ${renderDataField('1.2 Número originário anterior, se houver (Art. 60, 1):', getFieldValue('numeroProcessoOriginario'))}
  ${renderRadioSelection('1.3 Houve processo de conhecimento?', [
    { label: 'Sim', isChecked: getFieldValue('houveProcessoConhecimento') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('houveProcessoConhecimento') === 'Não' }
  ])}
  ${renderRadioSelection('1.4 Houve embargos à execução ou impugnação ao cálculo no cumprimento de sentença?', [
    { label: 'Sim', isChecked: getFieldValue('houveEmbargosExecucao') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('houveEmbargosExecucao') === 'Não' }
  ])}
  ${renderDataField('1.4.1 Data do decurso de prazo para apresentação dos embargos à execução (Art. 60, VII):', getFieldValue('dataDecursoPrazoEmbargos'))}

  ${renderSectionHeader('2. INFORMAÇÕES PERTINENTES À REQUISIÇÃO')}
  ${renderRadioSelection('2.1 NATUREZA DO CRÉDITO (Art. 20, II, art. 6º, III):', [
    { label: 'Comum', isChecked: getFieldValue('naturezaCredito') === 'Comum' },
    { label: 'Alimentar/Preferencial', isChecked: getFieldValue('naturezaCredito') === 'Alimentar' }
  ])}
  ${renderDataField('2.2 Assunto a que se refere a requisição (Art. 6°, X):', `Codigo nº: ${getFieldValue('codigoAssuntoProcesso')} | Assunto: ${getFieldValue('descricaoAssuntoProcesso')}`)}
  ${renderRadioSelection('2.3 Ação de natureza salarial (Art. 60, XII)?', [
    { label: 'Sim', isChecked: getFieldValue('possuiNaturezaSalarial') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('possuiNaturezaSalarial') === 'Não' }
  ])}
  ${renderRadioSelection('2.4 Requisição:', [
    { label: 'Parcial', isChecked: getFieldValue('tipoRequisicao') === 'Parcial' },
    { label: 'Complementar', isChecked: getFieldValue('tipoRequisicao') === 'Complementar' },
    { label: 'Suplementar', isChecked: getFieldValue('tipoRequisicao') === 'Suplementar' },
    { label: 'Original', isChecked: getFieldValue('tipoRequisicao') === 'Original' }
  ])}
  ${renderDataField('2.5 Data da intimação das partes quanto ao inteiro teor do Formulário Ofício Precatório:', getFieldValue('dataIntimacaoPartes'))}
  ${renderRadioSelection('2.6 O crédito foi objeto de cessão?', [
    { label: 'SIM', isChecked: getFieldValue('houveCessaoCreditoPrincipal') === 'Sim' },
    { label: 'NÃO', isChecked: getFieldValue('houveCessaoCreditoPrincipal') === 'Não' }
  ])}
  ${renderRadioSelection('2.7 O crédito foi objeto de penhora?', [
    { label: 'SIM', isChecked: getFieldValue('houvePenhoraCreditoPrincipal') === 'Sim' },
    { label: 'NÃO', isChecked: getFieldValue('houvePenhoraCreditoPrincipal') === 'Não' }
  ])}
  ${renderRadioSelection('2.8 O crédito principal foi objeto de sucessão?', [
    { label: 'SIM', isChecked: getFieldValue('houveSucessaoCreditoPrincipal') === 'Sim' },
    { label: 'NÃO', isChecked: getFieldValue('houveSucessaoCreditoPrincipal') === 'Não' }
  ])}

  ${renderSectionHeader('3. INFORMAÇÕES SOBRE O DEVEDOR')}
  ${renderDataField('3.1 ENTIDADE DEVEDORA / ENTE DEVEDOR (Art. 20, IV, V):', getFieldValue('entidadeDevedora'))}
  ${renderDataField('3.2 CNPJ:', getFieldValue('cnpjEntidadeDevedora'))}

  ${renderSectionHeader('4. INFORMAÇÕES SOBRE O BENEFICIÁRIO PRINCIPAL')}
  ${renderDataField('4.1 Nome do beneficiário principal:', getFieldValue('nomeBeneficiario'))}
  ${renderDataField('4.2 Nome social, se for o caso:', getFieldValue('nomeSocialBeneficiario'))}
  ${renderDataField('4.3 CPF/CNPJ ou RNE N°:', getFieldValue('numeroDocumentoBeneficiario'))}
  ${renderDataField('4.4 PIS/PASEP ou NIT N°:', getFieldValue('numeroInscricaoSocial'))}
  ${renderDataField('4.5 Data de nascimento (Art. 6º, IX):', getFieldValue('dataNascimentoBeneficiario'))}

  ${renderRadioSelection('4.6 O beneficiário:', [
    { label: 'Possui doença grave', isChecked: getFieldValue('possuiDoencaGrave') === 'Sim' },
    { label: 'É pessoa com deficiência', isChecked: getFieldValue('possuiDeficiencia') === 'Sim' },
    { label: 'Beneficiário de crédito por decisão judicial', isChecked: getFieldValue('possuiCreditoPreferencial') === 'Sim' },
    { label: 'Não se aplica', isChecked: getFieldValue('possuiDoencaGrave') !== 'Sim' && getFieldValue('possuiDeficiencia') !== 'Sim' && getFieldValue('possuiCreditoPreferencial') !== 'Sim' }
  ])}

  ${renderRadioSelection('4.7 O beneficiário:', [
    { label: 'Incapaz', isChecked: getFieldValue('condicaoCapacidadeBeneficiario') === 'Incapaz' },
    { label: 'Espólio', isChecked: getFieldValue('condicaoCapacidadeBeneficiario') === 'Espolio' },
    { label: 'Massa Falida', isChecked: getFieldValue('condicaoCapacidadeBeneficiario') === 'MassaFalida' },
    { label: 'Menor', isChecked: getFieldValue('condicaoCapacidadeBeneficiario') === 'Menor' },
    { label: 'Não se aplica', isChecked: getFieldValue('condicaoCapacidadeBeneficiario') === 'NaoSeAplica' }
  ])}

  ${renderRadioSelection('4.8 Deseja informar dados bancários:', [
    { label: 'Sim', isChecked: !!data.codigoBancoTitular },
    { label: 'Não', isChecked: !data.codigoBancoTitular }
  ])}

  ${renderRadioSelection('4.8.1 Titular da conta:', [
    { label: 'Beneficiário do crédito', isChecked: getFieldValue('titularContaBancaria') === 'BeneficiarioCredito' },
    { label: 'Representante Legal', isChecked: getFieldValue('titularContaBancaria') === 'RepresentanteLegal' }
  ])}

  ${renderDataField('4.8.2 CPF/CNPJ ou RNE N°:', getFieldValue('cpfTitularBancario') || getFieldValue('cnpjTitularBancario') || getFieldValue('rneTitularBancario'))}
  ${renderDataField('4.8.3 Banco:', getFieldValue('codigoBancoTitular'))}
  ${renderDataField('4.8.4 Agência:', getFieldValue('agenciaBancariaTitular'))}

  <div style="margin-bottom: 12px; font-family: Arial, sans-serif;">
    <strong style="font-weight: 600; font-size: 14px; color: #64748b; margin-right: 8px; vertical-align: middle;">4.8.5 Conta N°:</strong>
    <span style="font-size: 15px; font-weight: 500; color: #1e293b; vertical-align: middle; margin-right: 16px;">${getFieldValue('numeroContaBancariaTitular')}</span>
    <span style="display: inline-block; vertical-align: middle;">
      <span style="display: inline-block; margin-right: 16px; font-size: 14px; color: #1e293b;">
        <span style="font-weight: bold; margin-right: 4px;">(${getFieldValue('tipoContaBancariaTitular') === 'Corrente' ? ' X ' : '&nbsp;&nbsp;&nbsp;'})</span> Corrente
      </span>
      <span style="display: inline-block; margin-right: 16px; font-size: 14px; color: #1e293b;">
        <span style="font-weight: bold; margin-right: 4px;">(${getFieldValue('tipoContaBancariaTitular') === 'Poupanca' ? ' X ' : '&nbsp;&nbsp;&nbsp;'})</span> Poupança
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
        ${representativesHtml || '<tr><td colspan="3" style="border: 1px solid #e2e8f0; padding: 8px 16px; text-align: center; font-size: 14px;">-</td></tr>'}
      </tbody>
    </table>
  </div>

  ${renderDataField('4.10.1 Valor Bruto:', getFieldValue('valorBrutoTotal'))}
  ${renderDataField('4.10.2 Valor principal corrigido:', getFieldValue('valorPrincipalCorrigido'))}
  ${renderDataField('4.10.3 Data-base (Art. 2º, VI):', getFieldValue('dataLiquidacaoCalculo'))}
  
  ${renderRadioSelection('4.10.4 Haverá incidência de contribuições sobre o crédito, no momento do pagamento?', [
    { label: 'Sim', isChecked: getFieldValue('possuiDescontoPrevidenciario') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('possuiDescontoPrevidenciario') === 'Não' }
  ])}

  ${renderRadioSelection('4.10.5 Existe incidência de juros moratórios?', [
    { label: 'Sim', isChecked: getFieldValue('possuiJurosMoratorios') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('possuiJurosMoratorios') === 'Não' }
  ])}

  ${renderRadioSelection('4.10.6 Existe Incidência de juros compensatórios (remuneratórios)?', [
    { label: 'Sim', isChecked: getFieldValue('possuiJurosCompensatorios') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('possuiJurosCompensatorios') === 'Não' }
  ])}

  ${renderRadioSelection('4.10.7 Haverá Incidência de ITCD?', [
    { label: 'Sim', isChecked: getFieldValue('possuiIncidenciaItcd') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('possuiIncidenciaItcd') === 'Não' }
  ])}

  ${renderRadioSelection('4.10.8 Há tributação RRA a título de imposto de renda?', [
    { label: 'Sim', isChecked: getFieldValue('possuiTributacaoRra') === 'Sim' },
    { label: 'Não', isChecked: getFieldValue('possuiTributacaoRra') === 'Não' }
  ])}

  ${renderSectionHeader('5. ASSINATURAS')}
  <div style="min-height: 100px; border: 1px dashed #e2e8f0; margin-top: 16px; text-align: center; padding: 32px; font-family: Arial, sans-serif;">
    <span style="color: #94a3b8; font-size: 14px; font-weight: 600;">[Área reservada para assinaturas]</span>
  </div>

</main>
</body>
</html>`;
};