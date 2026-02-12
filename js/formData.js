export function getFormData() {
  const contractData = {
    key: {
      contractNumber: document.querySelector("#key__contract-number").value,
      contractDate: document.querySelector("#key__contract-date").value,
      contractDateEng: document.querySelector("#key__contract-date").value,
      contractCounterpartyName: document.querySelector("#key__contract-name").value,
      contractCounterpartyNameEng: document.querySelector("#key__contract-name-eng").value,
      contractCounterpartyAddress: document.querySelector("#key__details-addres").value,
      contractCounterpartyAddressEng: document.querySelector("#key__details-addres-eng").value,
      contractCounterpartyTIN: document.querySelector("#key__details-TIN").value,
      contractCounterpartyKPP: document.querySelector("#key__details-KPP").value,
      contractCounterpartyBankAccount: document.querySelector("#key__details-account").value,
      contractCounterpartyBank: document.querySelector("#key__details-bank").value,
      contractCounterpartyBankEng: document.querySelector("#key__details-bank-eng").value,
      contractCounterpartyCoreAccount: document.querySelector("#key__details-coreaccount").value,
      contractCounterpartyBIK: document.querySelector("#key__details-BIK").value,
      contractCounterpartyOKPO: document.querySelector("#key__details-OKPO").value,
    },
    subinfo: {
      contractLegislation: document.querySelector("#subinfo__juri").value,
      contractLegislationEng: document.querySelector("#subinfo__juri-eng").value,
      contractRepresentative: document.querySelector("#subinfo__juri-name").value,
      contractRepresentativeEng: document.querySelector("#subinfo__juri-name-eng").value,
      contractSignatory: document.querySelector("#subinfo__attorney").value,
      contractSignatoryEng: document.querySelector("#subinfo__attorney-eng").value,
      contractDocument: document.querySelector("#subinfo__attorney-doc").value,
      contractDocumentEng: document.querySelector("#subinfo__attorney-doc-eng").value,
    },
    subject: {
      contractMulti: document.querySelector('input[name="subject__subsidiaries"]:checked')?.value,
      contractReviewDate: document.querySelector("#subject__period").value,
      contractReviewDateEng: document.querySelector("#subject__period").value,
      contractRules: document.querySelector("#subject__audit").value,
      contractMandatory: document.querySelector("#subject__isMandatory").value,
      contractReportBilingual: document.querySelector("#subject__reportBilingual").value,
      contractReportCopies: document.querySelector("#subject__numberContracts").value,
    },
    cost: {
      contractPrice: document.querySelector("#cost__price").value,
      contractVAT: document.querySelector("#cost__VAT").value,
    },
    terms: {
      contractSign: document.querySelector("#terms__sign").value,
    },
    deadlines: {
      contractStage: document.querySelector("#deadlines__stage").value,
      contractEndDatePre: document.querySelector("#deadlines__end-date-pre").value,
      contractEndDatePreEng: document.querySelector("#deadlines__end-date-pre").value,
      contractEndDate: document.querySelector("#deadlines__end-date").value,
      contractEndDateEng: document.querySelector("#deadlines__end-date").value,
      contractReportDate: document.querySelector("#deadlines__report-date").value,
      contractReportDateEng: document.querySelector("#deadlines__report-date").value,
      contractGetRequestDatePre: document.querySelector("#deadlines__get-request-pre").value,
      contractGetRequestDatePreEng: document.querySelector("#deadlines__get-request-pre").value,
      contractGetRequestDate: document.querySelector("#deadlines__get-request").value,
      contractGetRequestDateEng: document.querySelector("#deadlines__get-request").value,
      contractRequestDatePre: document.querySelector("#deadlines__request-pre").value,
      contractRequestDatePreEng: document.querySelector("#deadlines__request-pre").value,
      contractRequestDate: document.querySelector("#deadlines__request").value,
      contractRequestDateEng: document.querySelector("#deadlines__request").value,
    },
    payment: {
      contractDevided: document.querySelector("#payment__devided").value,
      contractFirstPayment: document.querySelector("#payment__summ-first").value,
      contractSecondPayment: document.querySelector("#payment__summ-second").value,
      contractThirdPayment: document.querySelector("#payment__summ-third").value,
      contractEmail: document.querySelector("#payment__email").value,
    }
  };

  return contractData;
}
