export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  try {
    const { facture } = req.body;

    if (!facture) {
      return res.status(400).json({ erreur: 'Données facture manquantes' });
    }

    const dateFormatee = (facture.date_emission || '').replace(/-/g, '');
    const dateEcheance = (facture.date_echeance || '').replace(/-/g, '');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice 
  xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:factur-x.eu:1p0:minimum</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>

  <rsm:ExchangedDocument>
    <ram:ID>${facture.numero || 'INCONNU'}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${dateFormatee}</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>

  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${facture.emetteur?.nom || ''}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${facture.emetteur?.siret || ''}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${facture.emetteur?.tva || ''}</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${facture.client?.nom || ''}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${facture.client?.siret || ''}</ram:ID>
        </ram:SpecifiedLegalOrganization>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>

    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradePaymentTerms>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">${dateEcheance}</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${facture.totaux?.ht || 0}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${facture.totaux?.ht || 0}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">${facture.totaux?.tva || 0}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${facture.totaux?.ttc || 0}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${facture.totaux?.ttc || 0}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>

</rsm:CrossIndustryInvoice>`;

    return res.json({ succes: true, xml });

  } catch (error) {
    return res.status(500).json({ erreur: error.message });
  }
}
