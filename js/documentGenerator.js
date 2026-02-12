import { convertNum, convertNumEng } from "./utils.js";

export async function generateContract(data) {
  const {
    Document,
    Paragraph,
    Footer,
    Header,
    TextRun,
    Packer,
    AlignmentType,
    HeadingLevel,
    TabStopType,
    TabStopPosition,
    NumberFormat,
    PageNumber,
    LevelFormat,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    UnderlineType,
    PageBreak,
    TableLayoutType,
  } = window.docx;

  const emptyLine = () => new Paragraph({});
  const newTableRow = (numbering, text, bold) => {
    return new TableRow({
      children: [
        new TableCell({
          margins: {
            right: 250,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: numbering,
                  bold: bold,
                }),
              ],
            }),
            emptyLine(),
          ],
        }),

        new TableCell({
          margins: {
            right: 150,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: text,
                  bold: bold,
                }),
              ],
            }),
            emptyLine(),
          ],
        }),
      ],
    });
  };

  const newSingleTableRow = (text, bold) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: text,
                  bold: bold,
                }),
              ],
            }),
            emptyLine(),
          ],
        }),
      ],
    });
  };

  const newTableRowNoEmptyLine = (numbering, text, bold) => {
    return new TableRow({
      children: [
        new TableCell({
          margins: {
            right: 250,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: numbering,
                  bold: bold,
                }),
              ],
            }),
          ],
        }),

        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: text,
                  bold: bold,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };

  //! функция для payments логики
  const generatePaymentParagraphs = (dataPayment) => {
    const paragraphs = [];

    if (dataPayment.contractDevided === "one") {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Платеж в размере ${dataPayment.contractFirstPayment} (${convertNum(dataPayment.contractFirstPayment)}) рублей, увеличенного на сумму НДС, применимого на дату оказания услуг, осуществляется по предоставлении Аудиторского заключения, но не позднее ${data.deadlines.contractReportDate}`,
            }),
          ],
        }),
      );
    } else if (dataPayment.contractDevided === "two") {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Первый платеж в размере ${dataPayment.contractFirstPayment} (${convertNum(dataPayment.contractFirstPayment)}) рублей, увеличенного на сумму НДС, применимого на дату оказания услуг, осуществляется в течение 5 (пяти) рабочих дней после подписания настоящего Договора и получения счета.`,
            }),
          ],
        }),
        emptyLine(),
        new Paragraph({
          children: [
            new TextRun({
              text: `Последний платеж в размере ${dataPayment.contractSecondPayment} (${convertNum(dataPayment.contractSecondPayment)}) рублей, увеличенного на сумму НДС, применимого на дату оказания услуг, осуществляется по предоставлении Аудиторского заключения, но не позднее ${data.deadlines.contractReportDate}`,
            }),
          ],
        }),
      );
    } else if (dataPayment.contractDevided === "three") {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Первый платеж в размере ${dataPayment.contractFirstPayment} (${convertNum(dataPayment.contractFirstPayment)}) рублей, увеличенного на сумму НДС, применимого на дату оказания услуг, осуществляется в течение 5 (пяти) рабочих дней после подписания настоящего Договора и получения счета.`,
            }),
          ],
        }),
        emptyLine(),
        new Paragraph({
          children: [
            new TextRun({
              text: `Второй платеж в размере ${dataPayment.contractSecondPayment} (${convertNum(dataPayment.contractSecondPayment)}) рублей, увеличенного на сумму НДС, применимого на дату оказания услуг, осуществляется перед началом аудиторских процедур на финальном этапе проверки, но не позднее${data.deadlines.contractRequestDate}`,
            }),
          ],
        }),
        emptyLine(),
        new Paragraph({
          children: [
            new TextRun({
              text: `Последний платеж в размере ${dataPayment.contractThirdPayment} (${convertNum(dataPayment.contractThirdPayment)}) рублей, увеличенного на сумму НДС, применимого на дату оказания услуг, осуществляется по предоставлении Аудиторского заключения, но не позднее ${data.deadlines.contractReportDate}`,
            }),
          ],
        }),
        emptyLine(),
      );
    }
    return paragraphs;
  };

  const generatePaymentParagraphsEng = (dataPayment) => {
    const paragraphs = [];

    if (dataPayment.contractDevided === "one") {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `The payment in the amount of ${dataPayment.contractFirstPayment} (${convertNumEng(dataPayment.contractFirstPayment)}) rubles, increased by the amount of the VAT applicable on the date of service delivery, shall be made on the provision of Audit Opinion, but no later than ${dataPayment.contractReportDateEng}.`,
            }),
          ],
        }),
        emptyLine(),
      );
    }
    if (dataPayment.contractDevided === "two") {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `The first payment in the amount of ${dataPayment.contractFirstPayment} (${convertNumEng(dataPayment.contractFirstPayment)}) rubles, increased by the amount of the VAT applicable on the date of service delivery, shall be made within 5 (five) working days after signing this Agreement and receiving an invoice.`,
            }),
          ],
        }),
        emptyLine(),
        new Paragraph({
          children: [
            new TextRun({
              text: `The last payment in the amount of ${dataPayment.contractSecondPayment} (${convertNumEng(dataPayment.contractSecondPayment)}) rubles, increased by the amount of the VAT applicable on the date of service delivery, shall be made on the provision of Audit Opinion, but no later than ${dataPayment.contractReportDateEng}.`,
            }),
          ],
        }),
        emptyLine(),
      );
    }
    if (dataPayment.contractDevided === "three") {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `The first payment in the amount of ${dataPayment.contractFirstPayment} (${convertNumEng(dataPayment.contractFirstPayment)}) rubles, increased by the amount of the VAT applicable on the date of service delivery, shall be made within 5 (five) working days after signing this Agreement and receiving an invoice.`,
            }),
          ],
        }),
        emptyLine(),
        new Paragraph({
          children: [
            new TextRun({
              text: `The second payment in the amount of ${dataPayment.contractSecondPayment} (${convertNumEng(dataPayment.contractSecondPayment)}) rubles, increased by the amount of the VAT applicable on the date of service delivery, shall be made before the beginning of the audit procedures at the final stage of the audit, but not later than ${data.contractRequestDateEng}.`,
            }),
          ],
        }),
        emptyLine(),
        new Paragraph({
          children: [
            new TextRun({
              text: `The last payment in the amount of ${dataPayment.contractThirdPayment} (${convertNumEng(dataPayment.contractThirdPayment)}) rubles, increased by the amount of the VAT applicable on the date of service delivery, shall be made on the provision of Audit Opinion, but no later than ${dataPayment.contractReportDateEng}.`,
            }),
          ],
        }),
        emptyLine(),
      );
    }
    return paragraphs;
  };

  const newTableRowFourCol = (numbering, textOne, textTwo, isBold) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: numbering,
                  bold: isBold,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          margins: {
            right: 250,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textOne,
                  bold: isBold,
                }),
              ],
            }),
            emptyLine(),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: numbering,
                  bold: isBold,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textTwo,
                  bold: isBold,
                }),
              ],
            }),
            emptyLine(),
          ],
        }),
      ],
    });
  };

  const generateRatesEng = (textOne, textTwo, textThree, textFour, isBold) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textOne,
                  bold: isBold,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textTwo,
                  bold: isBold,
                }),
              ],
            }),
            emptyLine(),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textThree,
                  bold: isBold,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: textFour,
                  bold: isBold,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };

  //! логика для выбора типа договора (двуязычный или ру)
  const langSwitchBtn = document.querySelector(".cb");

  const doc = !langSwitchBtn.checked
    ? new Document({
        styles: {
          default: {
            document: {
              run: {
                font: "Times New Roman",
                size: 22,
                color: "#000000",
              },
              paragraph: {
                alignment: AlignmentType.JUSTIFIED,
              },
            },
          },
        },
        numbering: {
          config: [
            {
              reference: "numb",
              levels: [
                {
                  level: 0, // Это первый уровень
                  format: LevelFormat.DECIMAL,
                  text: "%1.",
                  alignment: AlignmentType.START,
                },
                {
                  level: 1, // Это подуровень вложенного уровня
                  format: LevelFormat.DECIMAL,
                  text: "%1.%1.",
                  alignment: AlignmentType.START,
                },
              ],
            },
          ],
        },

        sections: [
          {
            properties: {
              page: {
                margin: {
                  left: 1700.68,
                  right: 1133.79,
                  top: 719.95,
                  bottom: 719.95,
                  header: 500,
                  footer: 500,
                },
                pageNumbers: {
                  start: 1,
                  formatType: NumberFormat.DECIMAL,
                },
              },
            },
            headers: {
              default: new Header({
                children: [
                  new Paragraph({
                    children: [],
                  }),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    indent: {
                      right: 540,
                    },
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        children: [PageNumber.CURRENT],
                      }),
                    ],
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                spacing: {
                  line: 240,
                  before: 0,
                  after: 0,
                },
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1,
                children: [
                  new TextRun({
                    text: `ДОГОВОР ОКАЗАНИЯ АУДИТОРСКИХ УСЛУГ`,
                    bold: true,
                    font: "Times New Roman",
                    size: 22,
                    color: "#000000",
                  }),
                ],
              }),
              new Paragraph({
                spacing: {
                  line: 240,
                  before: 0,
                  after: 0,
                },
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1,
                children: [
                  new TextRun({
                    text: `№${data.key.contractNumber}`,
                    bold: true,
                    font: "Times New Roman",
                    size: 22,
                    color: "#000000",
                  }),
                ],
              }),
              new Paragraph({
                spacing: {
                  line: 240,
                  before: 0,
                  after: 0,
                },
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1,
                children: [
                  new TextRun({
                    text: ``,
                    font: "Times New Roman",
                    size: 22,
                    color: "#000000",
                  }),
                ],
              }),

              new Paragraph({
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                  },
                ],
                children: [
                  new TextRun({
                    text: `г. Москва`,
                  }),
                  new TextRun({
                    text: "\t",
                  }),
                  new TextRun({
                    text: `${data.key.contractDate}`,
                  }),
                ],
              }),

              emptyLine(),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `Настоящий Договор оказания аудиторских услуг (далее – “Договор”) заключен по состоянию на вышеуказанную дату между:`,
                  }),
                ],
              }),

              emptyLine(),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `АО “Бетерра”,`,
                    bold: true,
                  }),
                  new TextRun({
                    text: ` юридическим лицом, учрежденным и осуществляющим деятельность в соответствии с законодательством Российской Федерации, в лице Малкова Александра Борисовича, Генерального директора, действующего на основании Устава, именуемым в дальнейшем “Аудитор”.`,
                  }),
                ],
              }),

              emptyLine(),

              new Paragraph({
                text: `И`,
              }),

              emptyLine(),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `${data.key.contractCounterpartyName}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: `, юридическим лицом, учрежденным и осуществляющим деятельность в соответствии с законодательством ${data.subinfo.contractLegislation}, в лице ${data.subinfo.contractRepresentative}, ${data.subinfo.contractSignatory}, действующего на основании ${data.subinfo.contractDocument}, именуемым в дальнейшем “Заказчик”.`,
                  }),
                ],
              }),

              emptyLine(),

              new Paragraph({
                text: `Заказчик и Аудитор в дальнейшем совместно именуются “Стороны”, а по отдельности – “Сторона”.`,
              }),

              emptyLine(),

              new Table({
                columnWidths: [880, 8120],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow("1.", `ПРЕДМЕТ ДОГОВОРА`, true),
                  newTableRow(
                    "1.1.",
                    `Аудитор проведет аудит в отношении бухгалтерской (финансовой) отчетности Заказчика ${
                      data.subject.contractMulti === "yes"
                        ? `и его дочерних обществ`
                        : ``
                    } за период, заканчивающийся ${
                      data.subject.contractReviewDate
                    }, подготовленной в соответствии с ${
                      data.subject.contractRules === "ras"
                        ? `российскими правилами составления бухгалтерской отчетности`
                        : `Международными стандартами финансовой отчетности`
                    }, именуемой в дальнейшем “бухгалтерская (финансовая) отчетность Заказчика”. Указанный аудит является ${
                      data.subject.contractMandatory === "mandatory"
                        ? `обязательным.`
                        : `инициативным.`
                    } Услуги, описанные в настоящем пункте, могут в дальнейшем именоваться “Аудиторские услуги” или “Услуги”.`,
                  ),
                  newTableRow(
                    "",
                    `Целью аудита является выражение мнения о достоверности бухгалтерской (финансовой) отчетности Заказчика. Аудитор выражает свое мнение о достоверности бухгалтерской (финансовой) отчетности Заказчика во всех существенных отношениях.`,
                  ),
                  newTableRow(
                    "",
                    `Аудит проводится в соответствии с Международными стандартами аудита (далее – “Стандарты аудита”), утвержденными Советом по международным стандартам аудита и заданиям, обеспечивающим уверенность (“IAASB”). Данные Стандарты аудита требуют соблюдения применимых этических норм, а также планирования и проведения аудита таким образом, чтобы получить достаточную уверенность в том, что бухгалтерская (финансовая) отчетность Заказчика не содержит существенных искажений.`,
                  ),
                  newTableRow(
                    "",
                    `После завершения аудита Аудитор выпустит аудиторское заключение (далее по тексту – “Аудиторское заключение”), содержащее мнение Аудитора о достоверности во всех существенных отношениях бухгалтерской (финансовой) отчетности Заказчика в соответствии с ${
                      data.subject.contractRules === "ras"
                        ? `российскими правилами составления бухгалтерской отчетности`
                        : `Международными стандартами финансовой отчетности`
                    }.`,
                  ),
                  newTableRow(
                    "",
                    `Форма и содержание аудиторского заключения определяются Стандартами аудита. При этом, могут существовать такие обстоятельства, при которых аудиторское заключение может отличаться от ожидаемого по форме и содержанию. Аудиторское заключение будет составлено на русском языке. Все стоимостные показатели будут выражены в российских рублях.`,
                  ),
                  newTableRow(
                    "",
                    `Аудиторское заключение с прилагаемой бухгалтерской (финансовой) отчетностью Заказчика на бумажном носителе предоставляется Аудитором Заказчику в количестве ${data.subject.contractReportCopies} оригинальных экземпляров.`,
                  ),
                  newTableRow(
                    "1.2.",
                    `Консультирование по вопросам бухгалтерского учета, налогообложения и другим вопросам не является предметом настоящего Договора и выходит за рамки собственно аудита. Консультационные услуги являются прочими связанными с аудиторской деятельностью услугами, на оказание которых потребуется заключение отдельного договора или дополнения к настоящему Договору.`,
                  ),
                  newTableRow(
                    "1.3.",
                    `Результатами оказания Услуг могут быть не только Аудиторские заключения, но и письменная информация (отчеты и иные документы, а также консультации, как устные, так и письменные), которые далее могут совместно именоваться “Иные Отчеты”.`,
                  ),
                  newTableRow("2.", `ПРАВА И ОБЯЗАННОСТИ СТОРОН`, true),
                  newTableRow("2.1.", `Заказчик обязуется:`, true),
                  newTableRow(
                    "2.1.1",
                    `Обеспечить необходимые условия для работы сотрудников Аудитора в помещении Заказчика, включая предоставление отдельной комнаты.`,
                  ),
                  newTableRow(
                    "2.1.2",
                    `Обеспечить Аудитору доступ ко всей внутренней правовой, нормативной, распорядительной, бухгалтерской, финансовой, управленческой и другим видам информации и документации, включая, но не ограничиваясь бухгалтерской документацией на бумажных или электронных носителях, соглашениями, контрактами и корреспонденцией за период проверяемой бухгалтерской (финансовой) отчетности. Доступ предоставляется в период с даты, не позднее указанных в пункте 1.1. Приложения 1 и до даты предоставления Аудиторского заключения.`,
                  ),
                  newTableRow(
                    "2.1.3",
                    `Своевременно предоставлять необходимую информацию и документацию, в том числе по запросам Аудитора, давать по устному или письменному запросу Аудитора исчерпывающие разъяснения и подтверждения в устной и письменной форме, а также запрашивать необходимые для проведения аудита сведения у третьих лиц.`,
                  ),
                  newTableRow(
                    "2.1.4",
                    `Содействовать в организации встречи с лицами, ответственными за корпоративное управление, или его собственниками для осуществления информационного взаимодействия в ходе аудита бухгалтерской (финансовой) отчетности Заказчика в соответствии с требованиями Международного стандарт аудита 260 “Информационное взаимодействие с лицами, отвечающими за корпоративное управление”.`,
                  ),
                  newTableRow(
                    "2.1.5",
                    `Сообщать Аудитору любую информацию и уведомлять о любых событиях, которые могут иметь отношение к Услугам, оказываемым Аудитором по настоящему Договору.`,
                  ),
                  newTableRow(
                    "2.1.6",
                    `Не предпринимать каких бы то ни было действий, направленных на сужение круга вопросов, подлежащих выяснению при проведении аудита, а также на сокрытие (ограничение доступа) к информации и документации, запрашиваемых Аудитором. Наличие в запрашиваемых Аудитором для проведения аудита информации и документации сведений, содержащих коммерческую тайну, не может являться основанием для отказа в их предоставлении.`,
                  ),
                  newTableRow(
                    "2.1.7",
                    `Оплатить Услуги, указанные в пункте 1.1 настоящего Договора, на условиях и в порядке, установленных настоящим Договором, в том числе в случае, когда Аудиторское заключение не согласуется с позицией Заказчика.`,
                  ),
                  newTableRow(
                    "2.2.",
                    `Заказчик несет ответственность за подготовку и представление бухгалтерской (финансовой) отчетности Заказчика в соответствии с ${
                      data.subject.contractRules === "ras"
                        ? `российскими правилами составления бухгалтерской отчетности`
                        : `Международными стандартами финансовой отчетности`
                    }, в том числе за достоверность и раскрытие в ней необходимой информации, за соответствующее отражение всех фактов хозяйственной жизни в бухгалтерском учете, а также за систему внутреннего контроля, необходимую для составления бухгалтерской (финансовой) отчетности, не содержащей существенных искажений вследствие недобросовестных действий или ошибок. Аудит бухгалтерской (финансовой) отчетности Заказчика не освобождает Заказчика от такой ответственности.`,
                  ),
                  newTableRow(
                    "2.3.",
                    `Предоставляемая Заказчиком информация может содержать информацию о третьих лицах и/или персональные данные сотрудников Заказчика или иных физических лиц. Предоставляя Аудитору указанную информацию и персональные данные, Заказчик тем самым подтверждает, что получил или получит все необходимые разрешения на их обработку Аудитором согласно законодательству Российской Федерации.`,
                  ),
                  newTableRow(
                    "2.4.",
                    `Руководство Заказчика несет ответственность за корректировку бухгалтерской (финансовой) отчетности Заказчика с целью исправления существенных искажений, которые могут быть выявлены Аудитором, а также за направление Аудитору письменных заявлений с подтверждением того, что любые неисправленные руководством Заказчика искажения, выявленные аудитором в ходе текущей работы и относящиеся к последнему по времени представленному отчетному периоду, являются, по мнению руководства Заказчика, несущественными, как индивидуально, так и в совокупности, для бухгалтерской (финансовой) отчетности Заказчика в целом.`,
                  ),
                  newTableRow(
                    "2.5.",
                    `В случаях публикации или распространения в электронной форме аудиторского заключения с прилагаемой бухгалтерской (финансовой) отчетностью Заказчика, указанных в пункте 1.1 настоящего Договора, Заказчик несет ответственность за то, чтобы аудиторское заключение с прилагаемой бухгалтерской (финансовой) отчетностью Заказчика было представлено надлежащим образом. Заказчик обязуется при этом обеспечить, чтобы формат размещения на его веб-сайте финансовой информации позволял четко отделить проаудированную бухгалтерскую (финансовую) отчетность Заказчика от прочей информации и не допускал неоднозначного толкования или ввода в заблуждение ее пользователей.`,
                  ),
                  newTableRow("2.6.", `Заказчик имеет право:`, true),
                  newTableRow(
                    "2.6.1",
                    `Получать от Аудитора на основании собственных запросов информацию о требованиях законодательства и соответствующих Стандартов аудита, касающихся процедуры проведения аудита.`,
                  ),
                  newTableRow(
                    "2.6.2",
                    `Получать на основании собственных запросов информацию от Аудитора о нормативных актах и Стандартах аудита, на которых основываются содержащиеся в Аудиторских заключениях и Иных Отчетах замечания и выводы.`,
                  ),
                  newTableRow(
                    "2.6.3",
                    `Во всякое время проверять ход выполняемых работ, не вмешиваясь в деятельность Аудитора.`,
                  ),
                  newTableRow(
                    "2.6.4",
                    `Осуществлять иные права, вытекающие из настоящего Договора.`,
                  ),
                  newTableRow("2.7.", `Аудитор обязуется:`, true),
                  newTableRow(
                    "2.7.1",
                    `Провести аудит в соответствии с требованиями Федерального закона от 30 декабря 2008 г. № 307-ФЗ “Об аудиторской деятельности”, Международными стандартами аудита, Правилами независимости аудиторов и аудиторских организаций, Кодексом профессиональной этики аудиторов, действующим законодательством Российской Федерации, сложившейся практикой Аудитора.`,
                  ),
                  newTableRow(
                    "2.7.2",
                    `Спланировать и проводить аудит таким образом, чтобы получить достаточную уверенность в том, что бухгалтерская (финансовая) отчетность Заказчика не содержит существенных искажений.`,
                  ),
                  newTableRow(
                    "2.7.3",
                    `В процессе проведения аудита извещать Заказчика в письменной форме о значительных недостатках в системе внутреннего контроля, которые, по мнению Аудитора, должны быть доведены до сведения Заказчика. Значительным недостатком системы внутреннего контроля является недостаток или сочетание недостатков в системе внутреннего контроля, которые, согласно профессиональному суждению аудитора, являются достаточно важными и поэтому заслуживают внимания Заказчика и лиц, отвечающих за корпоративное управление.`,
                  ),
                  newTableRow(
                    "2.7.4",
                    `Предоставлять по требованию Заказчика необходимую информацию о требованиях законодательства Российской Федерации, касающихся проведения аудиторской проверки, нормативных актах Российской Федерации, а также МСФО, на которых основываются замечания и выводы Аудитора.`,
                  ),
                  newTableRow(
                    "2.7.5",
                    `В процессе проведения Аудита организовать свою работу таким образом, чтобы не осложнять текущую деятельность Заказчика.`,
                  ),
                  newTableRow(
                    "2.7.6",
                    `Соблюдать требования об обеспечении конфиденциальности информации, составляющей аудиторскую тайну, в соответствии с Статьей 7 настоящего договора.`,
                  ),
                  newTableRow(
                    "2.7.7",
                    `Обеспечивать сохранность оригиналов документов, получаемых от Заказчика в ходе оказания услуг по настоящему Договору, и по окончании Аудита возвратить их Заказчику.`,
                  ),
                  newTableRow(
                    "2.7.8",
                    `Передать в срок, установленный настоящим Договором, Аудиторское заключение Заказчику.`,
                  ),
                  newTableRow("2.8.", `Аудитор имеет право:`, true),
                  newTableRow(
                    "2.8.1",
                    `Самостоятельно определять формы и методы оказания аудиторских услуг в рамках действующих Стандартов аудита.`,
                  ),
                  newTableRow(
                    "2.8.2",
                    `Проверять у Заказчика в полном объеме документацию о финансово-хозяйственной деятельности, наличие любого имущества, отраженного в этой документации, получать информацию, включая письменные разъяснения, по возникшим вопросам и дополнительные сведения для исполнения настоящего Договора. Копии необходимых документов представляются Заказчиком в случае согласия в разумные сроки после получения предварительного письменного запроса Аудитора.`,
                  ),
                  newTableRow(
                    "2.8.3",
                    `Получать по письменному запросу необходимую для осуществления аудита информацию напрямую от третьих лиц, банков и государственных органов. Аудитор будет исходить из того, что предоставленная ему таким образом информация достоверна.`,
                  ),
                  newTableRow(
                    "2.8.4",
                    `Получать у должностных лиц Заказчика разъяснения и подтверждения в устной и письменной форме по возникшим в ходе аудита вопросам.`,
                  ),
                  newTableRow(
                    "2.8.5",
                    `Посещать помещение Заказчика в течение рабочего дня и, при необходимости, во внерабочее время после согласования с Заказчиком.`,
                  ),
                  newTableRow(
                    "2.8.6",
                    `В случае необходимости при выполнении настоящего Договора Аудитор вправе по согласованию с Заказчиком привлекать к оказанию услуг третьих лиц, при этом Аудитор несет ответственность за действия таких лиц как за свои собственные.`,
                  ),
                  newTableRow(
                    "2.8.7",
                    `Осуществлять иные права, вытекающие из настоящего Договора.`,
                  ),
                  newTableRow(
                    "2.9.",
                    `Стороны обязуются своевременно информировать друг друга о возникающих затруднениях, которые препятствуют выполнению работы по данному Договору не позже дня, следующего за днем, когда стороне стало известно о наличии указанных обстоятельств.`,
                  ),
                  newTableRow(
                    "2.10.",
                    `Стороны вправе осуществлять обмен информацией и документами, вести рабочую переписку по вопросам, связанным с исполнением настоящего Договора, направлять результаты услуг, акты об оказании услуг и иные документы, касающиеся настоящего Договора, с помощью корпоративных средств электронной и телефонной связи. Стороны обязуются отправлять электронные сообщения только путем использования принадлежащих им корпоративных доменов.`,
                  ),
                  newTableRow("3.", `СРОКИ ОКАЗАНИЯ УСЛУГ`, true),
                  newTableRow(
                    "3.1.",
                    `Сроки оказания Услуг Аудитором приводятся в Приложении № 1 к настоящему Договору.`,
                  ),
                  newTableRow(
                    "3.2.",
                    `Сроки оказания Услуг могут быть изменены по взаимной договоренности Сторон или в связи с обстоятельствами, изложенными в пункте 5.1. настоящего Договора.`,
                  ),
                  newTableRow(
                    "3.3.",
                    `Окончание оказания Услуг оформляется двусторонним Актом об оказании услуг, который подписывается полномочными представителями обеих Сторон. Услуги считаются оказанными на дату подписания обеими Сторонами Акта об оказании услуг.`,
                  ),
                  newTableRow(
                    "3.4.",
                    `В случае если Заказчик в течение 5 (пяти) рабочих дней не подписывает акт об оказании услуг и не возвращает один экземпляр данного документа Аудитору или не направляет Аудитору мотивированный отказ от подписания акта, Услуги Аудитора считаются принятыми, а Акт – подписанным.`,
                  ),
                  newTableRow(
                    "3.5.",
                    `Для обмена документами с использованием систем электронного документооборота Стороны соглашаются при осуществлении взаимоотношений между собой принимать к сведению и исполнению следующие документы в электронном виде, подписанные усиленной квалифицированной электронной подписью (далее – ЭП, или “электронная подпись”), посредством согласованной сторонами Системы защищенного юридически значимого электронного документооборота: договоры и дополнительные соглашения, акты оказанных услуг, счета-фактуры, счета на оплату. Стороны признают, что направленные и полученные ими в соответствии с условиями, определенными настоящим пунктом Договора, электронные документы, подписанные корректной ЭП уполномоченных лиц сторон, признаются равнозначными документам на бумажном носителе, подписанным собственноручной подписью и заверенным оттиском печати, соответствуют письменной форме документов, и порождают права и обязанности сторон при выполнении взаимных обязательств сторон.`,
                  ),
                  newTableRow(
                    "",
                    `Электронные документы, подписанные корректной ЭП, являются оригиналами, имеют юридическую силу и могут использоваться, в частности, в качестве доказательств в суде, а также при рассмотрении споров в досудебном порядке. Формирование и обмен документами в электронном виде, указанными в настоящем пункте Договора, осуществляется в системе оператора ЭДО по выбору сторон. Операторы, выбранные каждой стороной Договора, должны отвечать требованиям, установленным к операторам электронного документооборота действующим законодательством. При осуществлении электронного документооборота (далее – “ЭДО”) стороны руководствуются законодательством Российской Федерации, в частности, Федеральным законом от 06.04.2011 № 63-ФЗ “Об электронной подписи” (со всеми изменениями и дополнениями).`,
                  ),
                  newTableRow("4.", `СТОИМОСТЬ УСЛУГ И ПОРЯДОК ОПЛАТЫ`, true),
                  newTableRow(
                    "4.1.",
                    `Стоимость оказанных Аудитором Услуг по пункту 1.1. настоящего Договора составляет ${
                      data.cost.contractPrice
                    } (${convertNum(data.cost.contractPrice)}) рублей${
                      data.cost.contractVAT === "yes"
                        ? `, увеличенного на сумму НДС, применимого на дату оказания услуг`
                        : `. НДС не облагается в соответствии с гл. 26.2. НК РФ`
                    }.`,
                  ),
                  newTableRow(
                    "4.2.",
                    `Заказчик осуществляет оплату услуг Аудитора в соответствии с графиком, указанным в Приложении 2 к настоящему Договору.`,
                  ),
                  newTableRow(
                    "4.3.",
                    `Порядок и размер оплаты не зависят от содержания выводов Аудитора.`,
                  ),
                  newTableRow(
                    "4.4.",
                    `Заказчик производит оплату на основании счетов, выставляемых Аудитором. Счет должен быть оплачен в течение 5 (пяти) банковских дней со дня его получения.`,
                  ),
                  newTableRow(
                    "",
                    `Форма оплаты - безналичный расчет по платежному поручению.`,
                  ),
                  newTableRow(
                    "",
                    `Обязательства Заказчика по оплате услуг считаются исполненными с момента зачисления денежных средств на расчетный счет Аудитора.`,
                  ),
                  newTableRow(
                    "4.5.",
                    `Общая стоимость услуг Аудитора складывается из стоимости услуг, указанной в пункте 4.1. настоящего Договора, увеличенной на сумму документально подтвержденных расходов, понесенных Аудитором в связи с оказанием услуг по месту нахождения Заказчика за пределами Москвы, а именно расходы, связанные с переездом, проживанием в гостинице, дополнительные расходы, связанные с проживанием вне места постоянного жительства работников Аудитора (суточные), установленные локальным актом Аудитора, иные расходы. Сумма документально подтвержденных расходов, понесенных Аудитором в связи с оказанием услуг по месту нахождения Заказчика, увеличивается на сумму НДС, рассчитанную по ставке в соответствии с законодательством РФ о налогах и сборах на дату оказания услуг.`,
                  ),
                  newTableRow(
                    "4.6.",
                    `Дополнительные услуги, оказываемые Аудитором Заказчику в рамках профессиональной деятельности Аудитора, по вопросам, не относящимся к предмету настоящего Договора, подлежат согласованию Сторонами, оформляются отдельным договором и должны быть оплачены Заказчиком отдельно.`,
                  ),
                  newTableRow("5.", `ДОПОЛНИТЕЛЬНЫЕ РАБОТЫ И ЗАТРАТЫ`, true),
                  newTableRow(
                    "5.1.",
                    `Дополнительная (к сумме, указанной в пункте 4.1. настоящего Договора) стоимость работ, рассчитанная на основе дополнительного времени на выполнение работ, будет оплачена Заказчиком при условии согласования Сторонами необходимости проведения дополнительных работ, а также размера дополнительной оплаты за них в порядке, предусмотренном пунктом 5.2. настоящего Договора.`,
                  ),
                  newTableRow(
                    "5.2.",
                    `Дополнительные затраты, подпадающие под определение, приведенное в пункте 5.1 настоящего Договора, а также любые другие расходы, влияющие на общую стоимость проводимой аудиторской работы, должны согласовываться Сторонами. Аудитор сообщает Заказчику о возникновении подобных обстоятельств в письменной форме. В этом случае увеличение стоимости работ Аудитора подлежит согласованию Сторонами и оформляется дополнительным соглашением к настоящему Договору.`,
                  ),
                  newTableRow(
                    "5.3.",
                    `В случае выполнения Аудитором дополнительных работ, в порядке, установленном настоящей Статьей, соразмерно объемам этих дополнительных работ могут корректироваться сроки выполнения работ по Договору в соответствии с дополнительным соглашением сторон, указанным в пункте 5.1. настоящего Договора.`,
                  ),
                  newTableRow(
                    "5.4.",
                    `Аудитор не вправе требовать увеличения сроков выполнения работ и уплаты Заказчиком дополнительных платежей в случае, если необходимость этого не обусловлена неисполнением Заказчиком своих обязательств из настоящего Договора.`,
                  ),
                  newTableRow("6.", `ОТВЕТСТВЕННОСТЬ СТОРОН`, true),
                  newTableRow(
                    "6.1.",
                    `За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору Стороны несут ответственность в соответствии с законодательством Российской Федерации.`,
                  ),
                  newTableRow(
                    "6.2.",
                    `Ответственность Аудитора перед Заказчиком в отношении любого реального ущерба, возникшего у Заказчика в результате или как следствие оказываемых Аудитором Услуг согласно настоящему Договору, ограничивается суммой вознаграждения, полученной Аудитором за оказанные по настоящему Договору Услуги. Аудитор не обязан возмещать Заказчику упущенную выгоду или косвенные убытки.`,
                  ),
                  newTableRow(
                    "6.3.",
                    `Ответственность за полноту и достоверность информации, предоставленной Аудитору для целей аудита, несет Заказчик и сторона, предоставившая информацию по запросу Аудитора.`,
                  ),
                  newTableRow(
                    "6.4.",
                    `Аудитор не несет какую-либо ответственность в случаях предъявления налоговым органом претензий к Заказчику. Акт налогового органа не может являться достаточным доказательством ненадлежащего исполнения Аудитором обязательств по настоящему Договору. Аудитор не несет ответственность за не обнаружение искажений бухгалтерской (финансовой) отчетности в случае, если это не могло повлиять на мнение Аудитора относительно достоверности бухгалтерской (финансовой) отчетности в целом.`,
                  ),
                  newTableRow(
                    "6.5.",
                    `Аудитор не несет ответственность за нарушение сроков оказания Услуг по настоящему Договору вследствие неисполнения и/или ненадлежащего исполнения Заказчиком обязательств в соответствии с пунктом 1.1. Приложения 1 к настоящему Договору.`,
                  ),
                  newTableRow(
                    "7.",
                    `КОНФИДЕНЦИАЛЬНОСТЬ И ИСПОЛЬЗОВАНИЕ РЕЗУЛЬТАТОВ РАБОТЫ`,
                    true,
                  ),
                  newTableRow(
                    "7.1.",
                    `Аудитор обязан соблюдать требования об обеспечении конфиденциальности информации, составляющей аудиторскую тайну, согласно требованиям Федерального закона от 30 декабря 2008 года № 307-ФЗ “Об аудиторской деятельности”, в том числе после завершения аудита. За несоблюдение конфиденциальности коммерческой информации Заказчика Аудитор несет ответственность в соответствии с законодательством Российской Федерации.`,
                  ),
                  newTableRow(
                    "7.2.",
                    `Стороны обязаны обеспечивать сохранность сведений и документов, получаемых и (или) составляемых ими при осуществлении аудита, и не вправе передавать указанные сведения и документы или их копии третьим лицам либо разглашать их без письменного согласия на то каждой Стороны, за исключением случаев, предусмотренных Федеральным законом “Об аудиторской деятельности” и другими федеральными законами.`,
                  ),
                  newTableRow(
                    "7.3.",
                    `Подписывая настоящий Договор, Заказчик выражает свое информированное согласие на хранение любой информации и документов, переданных Аудитору и составленных Аудитором в процессе проведения аудиторской проверки, включая за текущий и предыдущие периоды, у третьих лиц, с которыми Аудитором заключены и действуют договоры об ответственном хранении документов.`,
                  ),
                  newTableRow(
                    "",
                    `В случае передачи вышеуказанной информации и документов на хранение третьим лицам, Аудитор обязуется обеспечить их хранение в полном соответствии с требованиями Федерального Закона от 30 декабря 2008 года № 307-ФЗ “Об аудиторской деятельности”.`,
                  ),
                  newTableRow(
                    "",
                    `В случае передачи вышеуказанной информации и документов на хранение третьим лицам, Аудитор обязуется обеспечить их хранение в полном соответствии с требованиями Федерального Закона от 30 декабря 2008 года № 307-ФЗ “Об аудиторской деятельности”.`,
                  ),
                  newTableRow(
                    //todo поставить брейки на "-"
                    "",
                    `Аудитор также гарантирует, что заключенные им договоры об ответственном хранении документов:- содержат условия об обеспечении хранителем режима конфиденциальности в отношении переданной ему на хранение информации и документов;- заключены надлежащим образом в соответствии с законодательством Российской Федерации, с учетом требований Федерального Закона “Об аудиторской деятельности”.`,
                  ),
                  newTableRow(
                    "7.4.",
                    `В соответствии с законодательством Российской Федерации от одной из Сторон может потребоваться предоставление в соответствующие органы информации, связанной с исполнением настоящего Договора, а также может возникнуть ситуация изъятия указанными органами документов, имеющих отношение к исполнению обязательств по настоящему Договору. Данные ситуации не являются нарушением условий конфиденциальности. В рамках, в которых позволяет законодательство, данная Сторона будет извещать другую Сторону о таких обстоятельствах.`,
                  ),
                  newTableRow(
                    "7.5.",
                    `Результаты работы Аудитора будут представлены Заказчику в форме Аудиторского заключения, как это указано в пункте 1.1. настоящего Договора. Заказчик может предоставлять экземпляры Аудиторского заключения и относящейся к нему бухгалтерской (финансовой) отчетности Заказчика внутренним и внешним пользователям данной отчетности.`,
                  ),
                  newTableRow(
                    "7.6.",
                    `Рабочие документы, подготовленные Аудитором в ходе проведения аудиторской проверки (включая копии документов как на бумажном, так и в электронном виде, которые были первоначально составлены Заказчиком или третьими лицами), являются собственностью Аудитора и находятся у него на хранении. Аудитор обязан хранить эти документы в течение периода, определенного российским законодательством. Аудитор несет ответственность за сохранение конфиденциальности, содержащейся в них информации в полном объеме, предусматривающую возмещение реального ущерба, причиненного Заказчику вызванного частичной или полной утратой переданной информацией конфиденциальности по вине Аудитора.`,
                  ),
                  newTableRow(
                    "7.7.",
                    `Стороны вправе вести переписку и пересылать документацию по электронной почте через сеть Интернет, по факсу или по почте. Ни одна из Сторон не несет ответственности за какой бы то ни было убыток, ущерб, расходы, вред или неудобство, возникшие в результате утраты, задержки, перехвата, искажения или изменения передаваемого по электронной почте через сеть Интернет, факсу или почте отправления по любой причине вне разумного контроля соответствующей Стороны.`,
                  ),
                  newTableRow(
                    "8.",
                    `ОБСТОЯТЕЛЬСТВА НЕПРЕОДОЛИМОЙ СИЛЫ (ФОРС-МАЖОР)`,
                    true,
                  ),
                  newTableRow(
                    "8.1.",
                    `Ни одна из Сторон не несет ответственности в случае невыполнения своих обязательств ввиду действия обстоятельств непреодолимой силы, то есть таких, которые она не могла ни предвидеть, ни предотвратить,  например,  стихийные бедствия (пожары, наводнения, землетрясения и т.п.), социальные конфликты (забастовки, гражданские войны и т.п.), а также издание законодательных актов, значительно осложняющих, ограничивающих или запрещающих  исполнение Сторонами своих обязательств,  из настоящего Договора.`,
                  ),
                  newTableRow(
                    "8.2.",
                    `Сторона, не исполняющая обязательства по настоящему Договору в силу возникновения обстоятельств непреодолимой силы, обязана в течение 5 (пяти) рабочих дней проинформировать другую Сторону о наступлении таких обстоятельств в письменной форме. Подобная информация должна содержать данные о характере обстоятельств непреодолимой силы, а также, по возможности, оценку их влияния на исполнение и возможный срок исполнения обязательств по настоящему Договору.`,
                  ),
                  newTableRow(
                    "8.3.",
                    `По прекращении действия указанных обстоятельств потерпевшая Сторона должна направить письменное уведомление об этом в соответствии с пунктом 8.2. настоящего Договора другой Стороне с указанием срока, в который предполагается исполнить обязательства по настоящему Договору и должна предпринять все меры для ограничения и минимизации эффекта данных обстоятельств.`,
                  ),
                  newTableRow(
                    "8.4.",
                    `В случае возникновения обстоятельств непреодолимой силы срок исполнения обязательств по настоящему Договору продлевается на срок действия обстоятельств непреодолимой силы и их последствий, в случае если данные обстоятельства будут продолжаться в течение более 5 (пяти) рабочих дней.`,
                  ),
                  newTableRow(
                    "8.5.",
                    `В том случае, если обстоятельства непреодолимой силы препятствуют одной из Сторон выполнить ее обязательства в течение срока, превышающего 5 (пять) рабочих дней, или если после их наступления выяснится, что они будут длиться более 5 (пяти) рабочих дней, любая из Сторон должна направить другой Стороне уведомление с предложением о проведении переговоров с целью определения взаимоприемлемых условий выполнения обязательств по настоящему Договору или прекращения действия настоящего Договора.`,
                  ),
                  newTableRow(
                    "8.6.",
                    `Досрочное прекращение или приостановление Договора не освобождает Заказчика от обязательств по оплате выполненной Аудитором работы и понесенных расходов на момент наступления события, предусмотренного пунктом 8.1. настоящего Договора.`,
                  ),
                  newTableRow("9.", `РАЗРЕШЕНИЕ СПОРОВ`, true),
                  newTableRow(
                    "9.1.",
                    `Любые споры и разногласия, которые могут возникнуть в ходе выполнения настоящего Договора, подлежат урегулированию путем переговоров уполномоченных представителей Сторон.`,
                  ),
                  newTableRow(
                    "9.2.",
                    `В случае невозможности разрешения споров путем переговоров, они подлежат передаче на разрешение в Арбитражный суд г. Москвы.`,
                  ),
                  newTableRow("10.", `ПРОЧИЕ УСЛОВИЯ`, true),
                  newTableRow(
                    "10.1.",
                    data.terms.contractSign === "paper"
                      ? `Настоящий Договор вступает в силу со дня подписания его Сторонами и действует до полного выполнения Сторонами принятых ими на себя обязательств и урегулирования всех платежей и расчетов.`
                      : `Настоящий Договор вступает в силу с ${data.key.contractDate} и действует до полного выполнения Сторонами принятых ими на себя обязательств и урегулирования всех платежей и расчетов.`,
                  ),
                  newTableRow(
                    "10.2.",
                    `Настоящий Договор может быть расторгнут:`,
                  ),
                  newTableRow(
                    "10.2.1",
                    `По письменному взаимному согласию Сторон.`,
                  ),
                  newTableRow(
                    "10.2.2",
                    `По требованию Одной из Сторон, в случае неоднократного нарушения условий выполнения данного Договора другой Стороны, при уведомлении другой Стороны за 30 (тридцать) календарных дней.`,
                  ),
                  newTableRow(
                    "10.2.3",
                    `Заказчик вправе досрочно расторгнуть настоящий Договор, при условии обязательного письменного уведомления Аудитора не менее, чем за 10 (Десять) рабочих дней до предполагаемой даты расторжения настоящего Договора и компенсации расходов, понесенных Аудитором и определяемых на основании действующих почасовых ставок специалистов Аудитора, представленным в Приложении № 3 к настоящему Договору.`,
                  ),
                  newTableRow(
                    "10.3",
                    `Досрочное прекращение Договора, любые изменения, дополнения и приложения к настоящему Договору действительны, если они сделаны в письменном виде и подписаны уполномоченными представителями каждой из Сторон.`,
                  ),
                  newTableRow(
                    "10.4",
                    `Применимым правом для настоящего Договора является право Российской Федерации.`,
                  ),
                  newTableRow(
                    "10.5",
                    `Настоящий Договор составлен и подписан в вышеуказанную дату в двух экземплярах, имеющих равную силу.`,
                  ),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                layout: {
                  type: TableLayoutType.FIXED,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow("РЕКВИЗИТЫ:", "", true),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `ЗАКАЗЧИК`,
                                underline: {
                                  type: UnderlineType.SINGLE,
                                },
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `АУДИТОР`,
                                underline: {
                                  type: UnderlineType.SINGLE,
                                },
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  newTableRowNoEmptyLine(
                    `Наименование: ${data.key.contractCounterpartyName}`,
                    `Наименование: АО "Бетерра"`,
                  ),
                  newTableRowNoEmptyLine(
                    `Адрес: ${data.key.contractCounterpartyAddress}`,
                    `Адрес: 125167, город Москва, Ленинградский пр-кт, д. 47 стр. 3`,
                  ),
                  newTableRowNoEmptyLine(
                    `ИНН: ${data.key.contractCounterpartyTIN}`,
                    `ИНН: 7704154440`,
                  ),
                  newTableRowNoEmptyLine(
                    `КПП: ${data.key.contractCounterpartyKPP}`,
                    `КПП: 771401001`,
                  ),
                  newTableRowNoEmptyLine(
                    `Расчётный счет: ${data.key.contractCounterpartyBankAccount}`,
                    `Расчётный счет:`,
                  ),
                  newTableRowNoEmptyLine(
                    `Банк: ${data.key.contractCounterpartyBank}`,
                    `Банк:`,
                  ),
                  newTableRowNoEmptyLine(
                    `Корреспондентский счет: ${data.key.contractCounterpartyCoreAccount}`,
                    `Корреспондентский счет:`,
                  ),
                  newTableRowNoEmptyLine(
                    `БИК: ${data.key.contractCounterpartyBIK}`,
                    `БИК:`,
                  ),
                  newTableRowNoEmptyLine(
                    `ОКПО: ${data.key.contractCounterpartyOKPO}`,
                    `ОКПО:`,
                  ),

                  newTableRow("", ""),
                  newTableRow("ПОДПИСАНО:", "ПОДПИСАНО:", true),
                  newTableRow("ОТ ЗАКАЗЧИКА", "ОТ АУДИТОРА", true),
                  newTableRow("", ""),
                  newTableRow("", ""),
                  newTableRow("_____________________", "_____________________"),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [9000],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Приложение № 1`,
                              }),
                              new TextRun({
                                text: `к Договору оказания аудиторских услуг №${data.key.contractNumber} от ${data.key.contractDate}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newSingleTableRow(`СРОКИ ОКАЗАНИЯ УСЛУГ`, true),
                  newSingleTableRow(
                    `1.1. Срок окончания Аудитором услуг в соответствии с пунктом 1.1. настоящего Договора, составляет${
                      data.deadlines.contractStage === "no"
                        ? ` ${data.deadlines.contractEndDate}, если иное не будет согласовано сторонами.`
                        : `:`
                    }`,
                  ),
                  newSingleTableRow(
                    data.deadlines.contractStage === "yes"
                      ? `По предварительному этапу проверки – ${data.deadlines.contractEndDatePre}. По финальному этапу проверки – ${data.deadlines.contractEndDate}, если иное не будет согласовано Сторонами.`
                      : ``,
                  ),
                  newSingleTableRow(
                    `Аудиторское Заключение по бухгалтерской (финансовой) отчетности будет представлено не позднее ${data.deadlines.contractReportDate}, если иное не будет согласовано Сторонами. `,
                  ),
                  newSingleTableRow(
                    `Аудитор согласен на оказание услуг в указанные сроки при условии, что информация согласно Перечню запрашиваемой информации ${
                      data.deadlines.contractStage === "no"
                        ? `будет предоставлена не позднее ${data.deadlines.contractGetRequestDate}.`
                        : `для предварительного этапа проверки будет предоставлена не позднее ${data.deadlines.contractGetRequestDatePre}, информация согласно финальному Перечню запрашиваемой информации - не позднее ${data.deadlines.contractGetRequestDate}.`
                    }`,
                  ),
                  newSingleTableRow(
                    `В противном случае, срок предоставления Аудитором отчетов по результатам финального аудита будет скорректирован.`,
                  ),
                  newSingleTableRow(
                    `1.2. Перечни запрашиваемой информации и документов будут направлены Аудитором Заказчику не позднее ${
                      data.deadlines.contractStage === "no"
                        ? `${data.deadlines.contractRequestDate}.`
                        : ` ${data.deadlines.contractRequestDatePre} по предварительному этапу проверки и не позднее ${data.deadlines.contractRequestDate} по финальному этапу проверки.`
                    } В противном случае, срок предоставления Заказчиком запрашиваемой информации будет скорректирован.`,
                  ),
                  newSingleTableRow(
                    `Возможные дополнительные запросы будут направляться Аудитором Заказчику заранее, с учетом необходимого времени для сбора и обработки информации Заказчиком.`,
                  ),
                  newSingleTableRow(
                    `Предварительно Заказчик обязуется предоставлять запрашиваемую Аудитором информацию и документы по дополнительным запросам Аудитора в течение 2 рабочих дней с момента получения Заказчиком письменного запроса, если подготовка Заказчиком информации и документов не потребует дополнительного времени.`,
                  ),
                ],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow("", ""),
                  newTableRow("ПОДПИСАНО:", "ПОДПИСАНО:", true),
                  newTableRow("ОТ ЗАКАЗЧИКА", "ОТ АУДИТОРА", true),
                  newTableRow("", ""),
                  newTableRow("", ""),
                  newTableRow("_____________________", "_____________________"),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [9000],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Приложение № 2`,
                              }),
                              new TextRun({
                                text: `к Договору оказания аудиторских услуг №${data.key.contractNumber} от ${data.key.contractDate}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newSingleTableRow(`ПОРЯДОК ОПЛАТЫ УСЛУГ`, true),
                  newSingleTableRow(
                    `Заказчик осуществляет оплату услуг Аудитора в соответствии со следующим графиком:`,
                  ),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          ...generatePaymentParagraphs(data.payment),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newSingleTableRow(
                    `Аудитор в течение 3 (трех) рабочих дней с даты окончания предоставления услуг направляет Заказчику скан Акта выполненных работ, подписанный со своей стороны, на электронную почту ${data.payment.contractEmail}. Оригинал Акта выполненных работ, подписанный со своей стороны, в 2 (двух) экземплярах, либо направленный с использованием систем электронного документооборота в соответствии с пунктом 3.5. настоящего Договора, Аудитор направляет Заказчику в течение 5 (пяти) рабочих дней с даты окончания предоставления услуг.`,
                  ),
                  newSingleTableRow(
                    `Заказчик обязан подписать Акт выполненных работ и вернуть его Аудитору в течение 5 (пяти) рабочих дней со дня получения Акта либо предоставить мотивированный отказ от подписания.`,
                  ),
                  newSingleTableRow(
                    `В случае непредставления Аудитору подписанного со стороны Заказчика Акта или мотивированного отказа от его подписания в течение 5 (пяти) рабочих дней с момента получения его Заказчиком, услуги считаются принятыми Заказчиком.`,
                  ),
                ],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow("", ""),
                  newTableRow("ПОДПИСАНО:", "ПОДПИСАНО:", true),
                  newTableRow("ОТ ЗАКАЗЧИКА", "ОТ АУДИТОРА", true),
                  newTableRow("", ""),
                  newTableRow("", ""),
                  newTableRow("_____________________", "_____________________"),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [9000],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Приложение № 3`,
                              }),
                              new TextRun({
                                text: `к Договору оказания аудиторских услуг №${data.key.contractNumber} от ${data.key.contractDate}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newSingleTableRow(
                    `ПОЧАСОВЫЕ СТАВКИ СПЕЦИАЛИСТОВ АУДИТОРА ПО ДОЛЖНОСТНЫМ УРОВНЯМ (без учета НДС)`,
                    true,
                  ),
                ],
              }),

              new Table({
                columnWidths: [3500, 5500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRowNoEmptyLine(``, `Рублей в час`),
                  newTableRowNoEmptyLine(`Партнер`, `20 000`),
                  newTableRowNoEmptyLine(`Директор`, `20 000`),
                  newTableRowNoEmptyLine(`Старший менеджер`, `15 000`),
                  newTableRowNoEmptyLine(`Менеджер`, `12 500`),
                  newTableRowNoEmptyLine(`Ведущий аудитор`, `9 000`),
                  newTableRowNoEmptyLine(`Старший аудитор`, `7 500`),
                  newTableRowNoEmptyLine(`Аудитор`, `5 000`),
                  newTableRowNoEmptyLine(`Опытный ассистент аудитора`, `4 000`),
                  newTableRowNoEmptyLine(`Ассистент аудитора`, `2 500`),
                ],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow("", ""),
                  newTableRow("ПОДПИСАНО:", "ПОДПИСАНО:", true),
                  newTableRow("ОТ ЗАКАЗЧИКА", "ОТ АУДИТОРА", true),
                  newTableRow("", ""),
                  newTableRow("", ""),
                  newTableRow("_____________________", "_____________________"),
                ],
              }),
            ],
          },
        ],
      })
    : //!двуязычный договор
      new Document({
        styles: {
          default: {
            document: {
              run: {
                font: "Times New Roman",
                size: 22,
                color: "#000000",
              },
              paragraph: {
                alignment: AlignmentType.JUSTIFIED,
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  left: 1000,
                  right: 1000,
                  top: 1133.79,
                  bottom: 720,
                  header: 450,
                  footer: 800,
                },
                pageNumbers: {
                  start: 1,
                  formatType: NumberFormat.DECIMAL,
                },
              },
            },
            headers: {
              default: new Header({
                children: [
                  new Paragraph({
                    children: [],
                  }),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    indent: {
                      right: 540,
                    },
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        children: [PageNumber.CURRENT],
                      }),
                    ],
                  }),
                ],
              }),
            },
            children: [
              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            margins: {
                              right: 250,
                            },
                            children: [
                              new TextRun({
                                text: `ДОГОВОР ОКАЗАНИЯ АУДИТОРСКИХ УСЛУГ`,
                                bold: true,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: `№${data.key.contractNumber}`,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: `AUDITING SERVICES AGREEMENT`,
                                bold: true,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: `No.${data.key.contractNumber}`,
                                bold: true,
                              }),
                            ],
                          }),
                          emptyLine(),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new Table({
                columnWidths: [1000, 3500, 1000, 3500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `г. Москва`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                              new TextRun({
                                text: `${data.key.contractDate}`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Moscow`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                              new TextRun({
                                text: `${data.key.contractDateEng}`,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow(
                    `Настоящий Договор оказания аудиторских услуг (далее – “Договор”) заключен по состоянию на вышеуказанную дату между:`,
                    `This Auditing Services Agreement (hereinafter referred to as the “Agreement”) is entered into as of the date first above written by and between:`,
                  ),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `АО “Бетерра”`,
                                bold: true,
                              }),
                              new TextRun({
                                text: `, юридическим лицом, учрежденным и осуществляющим деятельность в соответствии с законодательством Российской Федерации, в лице Малкова Александра Борисовича, Генерального директора, действующего на основании Устава, именуемым в дальнейшем “Аудитор”`,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `JSC “Beterra”`,
                                bold: true,
                              }),
                              new TextRun({
                                text: `, a legal entity organized and operating under the laws of the Russian Federation, represented by General Director Mr. Alexander Malkov, acting by the Charter, hereinafter referred to as the “Auditor”`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  newTableRow(`И`, `And`),
                  newTableRow(
                    `${data.key.contractCounterpartyName}, юридическим лицом, учрежденным и осуществляющим деятельность в соответствии с законодательством ${data.subinfo.contractLegislation}, в лице ${data.subinfo.contractRepresentative}, ${data.subinfo.contractSignatory}, действующего на основании ${data.subinfo.contractDocument}, именуемым в дальнейшем “Заказчик”.`,
                    `${data.key.contractCounterpartyNameEng},a legal entity organized and operating under the laws of the ${data.subinfo.contractLegislationEng}, represented by, ${data.subinfo.contractRepresentativeEng}, in his capacity of ${data.subinfo.contractSignatoryEng}, acting by ${data.subinfo.contractDocumentEng}, hereinafter referred to as the “Client”.`,
                  ),
                  newTableRow(
                    `Заказчик и Аудитор в дальнейшем совместно именуются “Стороны”, а по отдельности – “Сторона”.`,
                    `The Client and the Auditor are hereinafter jointly referred to as the “Parties” and separately as the “Party”.`,
                  ),
                ],
              }),

              emptyLine(),
              
              new Table({
                columnWidths: [800, 3700, 800, 3700],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRowFourCol(
                    `1.`,
                    `ПРЕДМЕТ ДОГОВОРА`,
                    `SUBJECT OF THE AGREEMENT`,
                    true,
                  ),
                  newTableRowFourCol(
                    `1.1.`,
                    `Аудитор проведет аудит в отношении бухгалтерской (финансовой) отчетности Заказчика ${
                      data.subject.contractMulti === "yes"
                        ? `и его дочерних обществ`
                        : ``
                    } за период, заканчивающийся ${
                      data.subject.contractReviewDate
                    }, подготовленной в соответствии с ${
                      data.subject.contractRules === "ras"
                        ? `российскими правилами составления бухгалтерской отчетности`
                        : `Международными стандартами финансовой отчетности`
                    }, именуемой в дальнейшем “бухгалтерская (финансовая) отчетность Заказчика”. Указанный аудит является ${
                      data.subject.contractMandatory === "mandatory"
                        ? `обязательным.`
                        : `инициативным.`
                    } Услуги, описанные в настоящем пункте, могут в дальнейшем именоваться “Аудиторские услуги” или “Услуги”.`,
                    `The Auditor shall conduct the audit in relation to the Client’s financial statements ${
                      data.subject.contractMulti === "yes"
                        ? `and its subsidiaries`
                        : ``
                    } for the period ending ${
                      data.subject.contractReviewDateEng
                    } in accordance with ${
                      data.subject.contractRules === "ras"
                        ? `Russian financial statements Standards`
                        : `International Financial Reporting Standards`
                    }, (hereinafter, “the Client’s financial statements”). The specified audit is ${
                      data.subject.contractMandatory === "mandatory"
                        ? `mandatory`
                        : `non-mandatory`
                    }. The services described in this paragraph may hereinafter be referred to as either the “Audit Services” or the “Services”.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Целью аудита является выражение мнения о достоверности бухгалтерской (финансовой) отчетности Заказчика. Аудитор выражает свое мнение о достоверности бухгалтерской (финансовой) отчетности Заказчика во всех существенных отношениях.`,
                    `The purpose of the audit is to express an opinion on the reliability of the Client’s financial statements. The auditor expresses his opinion on the reliability of the Client’s financial statements in all material respects.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Аудит проводится в соответствии с Международными стандартами аудита (далее – “Стандарты аудита”), утвержденными Советом по международным стандартам аудита и заданиям, обеспечивающим уверенность (“IAASB”). Данные Стандарты аудита требуют соблюдения применимых этических норм, а также планирования и проведения аудита таким образом, чтобы получить достаточную уверенность в том, что бухгалтерская (финансовая) отчетность Заказчика не содержит существенных искажений.`,
                    `The audit shall be conducted in accordance with the international standards on auditing (hereinafter, “the Standards on Auditing”), approved by the International Auditing and Assurance Standards Board (“IAASB”). Such Standards on Auditing require that the Auditor comply with ethical requirements and plan and perform the audit to obtain reasonable assurance that the Russian financial statements are free from material misstatement.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `После завершения аудита Аудитор выпустит аудиторское заключение (далее по тексту – “Аудиторское заключение”), содержащее мнение Аудитора о достоверности во всех существенных отношениях бухгалтерской (финансовой) отчетности Заказчика в соответствии с ${
                      data.subject.contractRules === "ras"
                        ? `российскими правилами составления бухгалтерской отчетности`
                        : `Международными стандартами финансовой отчетности`
                    }.`,
                    `Upon completion of the audit the Auditor shall issue an Auditor’s Report (the “Auditor’s Report”), which will contain an opinion on the reliability of the Client’s financial statements in all material respects in accordance with ${
                      data.subject.contractRules === "ras"
                        ? `Russian financial statements Standards`
                        : `International Financial Reporting Standards`
                    }.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Форма и содержание аудиторского заключения определяются Стандартами аудита. При этом, могут существовать такие обстоятельства, при которых аудиторское заключение может отличаться от ожидаемого по форме и содержанию.`,
                    `The form and content of the Auditor’s Report shall be defined in accordance with the Standards on Auditing. Meanwhile, there may be circumstances in which an Auditor’s Report may differ from its expected form and content.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Аудиторское заключение будет составлено на русском языке${
                      data.subject.contractReportBilingual === "yes"
                        ? `. Дополнительно Аудитор предоставит перевод аудиторского заключения с русского на английский язык`
                        : ``
                    }. Все стоимостные показатели будут выражены в российских рублях.`,
                    `The Auditor’s Report shall be prepared in Russian${
                      data.subject.contractReportBilingual === "yes"
                        ? `. The Auditor will additionally provide with a translation of the audit report from Russian to English language`
                        : ``
                    }. All amounts will be expressed in Russian Rubles.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Аудиторское заключение с прилагаемой бухгалтерской (финансовой) отчетностью Заказчика на бумажном носителе предоставляется Аудитором Заказчику в количестве ${data.subject.contractReportCopies} оригинальных экземпляров.`,
                    `The Auditor’s Report with the Client’s financial statements in a hard copy is provided by the Auditor to the Client in the amount of ${data.subject.contractReportCopies} original copies.`,
                  ),
                  newTableRowFourCol(
                    `1.2.`,
                    `Консультирование по вопросам бухгалтерского учета, налогообложения и другим вопросам не является предметом настоящего Договора и выходит за рамки собственно аудита. Консультационные услуги являются прочими связанными с аудиторской деятельностью услугами, на оказание которых потребуется заключение отдельного договора или дополнения к настоящему Договору.`,
                    `Advising on accounting, taxation and other matters is not the subject of this agreement and goes beyond the scope of the audit. Consulting services are related to audit services, the provision of which will require the conclusion of a separate agreement or supplement to this agreement.`,
                  ),
                  newTableRowFourCol(
                    `1.3.`,
                    `Результатами оказания Услуг могут быть не только Аудиторские заключения, но и письменная информация (отчеты и иные документы, а также консультации, как устные, так и письменные), которые далее могут совместно именоваться “Иные Отчеты”.`,
                    `Deliverables from the provision of Services (hereinafter referred to as the “Deliverables”) may include, in addition to the Auditor’s Report, other written information (reports and other documents, as well as advice, whether oral or written), which may be hereinafter jointly referred to as “Other Deliverables”.`,
                  ),
                  newTableRowFourCol(
                    `2.`,
                    `ПРАВА И ОБЯЗАННОСТИ СТОРОН`,
                    `RIGHTS AND RESPONSIBILITIES OF THE PARTIES`,
                    true,
                  ),
                  newTableRowFourCol(
                    `2.1.`,
                    `Заказчик обязуется:`,
                    `The Client agrees and undertakes:`,
                    true,
                  ),
                  newTableRowFourCol(
                    `2.1.1`,
                    `Обеспечить необходимые условия для работы сотрудников Аудитора в помещении Заказчика, включая предоставление отдельной комнаты.`,
                    `To ensure proper conditions for the Auditor’s personnel in the Client’s premises including the provision of a separate office.`,
                  ),
                  newTableRowFourCol(
                    `2.1.2`,
                    `Обеспечить Аудитору доступ ко всей внутренней правовой, нормативной, распорядительной, бухгалтерской, финансовой, управленческой и другим видам информации и документации, включая, но не ограничиваясь бухгалтерской документацией на бумажных или электронных носителях, соглашениями, контрактами и корреспонденцией за период проверяемой бухгалтерской (финансовой) отчетности. Доступ предоставляется в период с даты, не позднее указанных в пункте 1.1. Приложения 1 и до даты предоставления Аудиторского заключения. `,
                    `To supply the Auditor with all the internal legal, normative, directive, accounting, finance, management and other information and documentation including but not limited to accounting documentation either in printed or electronic form, agreements, contracts and correspondence for the audited period. Access is granted from the date not later than indicated in clause 1.1. Annex 1 and to the moment of provision of the Audit Opinion.`,
                  ),
                  newTableRowFourCol(
                    `2.1.3`,
                    `Своевременно предоставлять необходимую информацию и документацию, в том числе по запросам Аудитора, давать по устному или письменному запросу Аудитора исчерпывающие разъяснения и подтверждения в устной и письменной форме, а также запрашивать необходимые для проведения аудита сведения у третьих лиц`,
                    `To provide timely all required information and documentation, including provision of the documentation and comprehensive explanations, reasonably requested by the Auditor, and to request information necessary for the audit from third parties.`,
                  ),
                  newTableRowFourCol(
                    `2.1.4`,
                    `Содействовать в организации встречи с лицами, ответственными за корпоративное управление, или его собственниками для осуществления информационного взаимодействия в ходе аудита бухгалтерской (финансовой) отчетности Заказчика в соответствии с требованиями Международного стандарт аудита 260 “Информационное взаимодействие с лицами, отвечающими за корпоративное управление”.`,
                    `To assist in the organization of a meeting with persons responsible for corporate governance or its owners for the communication during the audit of the Client’s financial statements in accordance with the requirements of International Standard on Auditing 260 “Communication with those charged with governance”.`,
                  ),
                  newTableRowFourCol(
                    `2.1.5`,
                    `Сообщать Аудитору любую информацию и уведомлять о любых событиях, которые могут иметь отношение к Услугам, оказываемым Аудитором по настоящему Договору.`,
                    `To notify the Auditor of any information and to notify of any events that may be related to the Services provided by the Auditor under this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `2.1.6`,
                    `Не предпринимать каких бы то ни было действий, направленных на сужение круга вопросов, подлежащих выяснению при проведении аудита, а также на сокрытие (ограничение доступа) к информации и документации, запрашиваемых Аудитором. Наличие в запрашиваемых Аудитором для проведения аудита информации и документации сведений, содержащих коммерческую тайну, не может являться основанием для отказа в их предоставлении.`,
                    `Not to take any action aimed at narrowing the range of issues to be clarified during the audit, as well as to conceal (access restriction) to information and documentation requested by the Auditor. The presence in the information required by the Auditor to audit information and documentation containing commercial confidentiality can not be grounds for refusing to provide them.`,
                  ),
                  newTableRowFourCol(
                    `2.1.7`,
                    `Оплатить Услуги, указанные в пункте 1.1 настоящего Договора, на условиях и в порядке, установленных настоящим Договором, в том числе в случае, когда Аудиторское заключение не согласуется с позицией Заказчика.`,
                    `To pay for the Services specified in clause 1.1. of this Agreement on terms established by this Agreement, including the case when the Auditor's report is not consistent with the Clients's position.`,
                  ),
                  newTableRowFourCol(
                    `2.2.`,
                    `Заказчик несет ответственность за подготовку и представление бухгалтерской (финансовой) отчетности Заказчика в соответствии с ${
                      data.subject.contractRules === "ras"
                        ? `российскими правилами составления бухгалтерской отчетности`
                        : `Международными стандартами финансовой отчетности`
                    }, в том числе за достоверность и раскрытие в ней необходимой информации, за соответствующее отражение всех фактов хозяйственной жизни в бухгалтерском учете, а также за систему внутреннего контроля, необходимую для составления бухгалтерской (финансовой) отчетности, не содержащей существенных искажений вследствие недобросовестных действий или ошибок. Аудит бухгалтерской (финансовой) отчетности Заказчика не освобождает Заказчика от такой ответственности.`,
                    `The Client is responsible for the preparation and presentation of the Client's financial statements in accordance with ${
                      data.subject.contractRules === "ras"
                        ? `Russian financial statements Standards`
                        : `International Financial Reporting Standards`
                    }, for the reliability and disclosure of the necessary information, for the appropriate reflection of all facts of economic life in accounting, for the internal control system necessary to compile financial statements that are not substantially distorted due to fraud or errors. Audit of the Client's financial statements does not relieve the Client's of such responsibility.`,
                  ),
                  newTableRowFourCol(
                    `2.3`,
                    `Предоставляемая Заказчиком информация может содержать информацию о третьих лицах и/или персональные данные сотрудников Заказчика или иных физических лиц. Предоставляя Аудитору указанную информацию и персональные данные, Заказчик тем самым подтверждает, что получил или получит все необходимые разрешения на их обработку Аудитором согласно законодательству Российской Федерации. `,
                    `Information provided by the Client may contain information about third parties and / or personal data of employees of the Client or other individuals. Providing the specified information and personal data to the Auditor, the Client thereby confirms that he has received or will receive all necessary permits for their processing by the Auditor in accordance with the laws of the Russian Federation.`,
                  ),
                  newTableRowFourCol(
                    `2.4`,
                    `Руководство Заказчика несет ответственность за корректировку бухгалтерской (финансовой) отчетности Заказчика с целью исправления существенных искажений, которые могут быть выявлены Аудитором, а также за направление Аудитору письменных заявлений с подтверждением того, что любые неисправленные руководством Заказчика искажения, выявленные аудитором в ходе текущей работы и относящиеся к последнему по времени представленному отчетному периоду, являются, по мнению руководства Заказчика, несущественными, как индивидуально, так и в совокупности, для бухгалтерской (финансовой) отчетности Заказчика в целом.`,
                    `Client’s management is responsible for adjusting the financial statements to correct material misstatements that may be found by the Auditor and for affirming to the Auditor in the representation letter that the effects of any unrecorded by the Client’s management misstatements aggregated by the auditor during the current engagement and pertaining to the latest period presented are in the view of the Client’s management immaterial, both individually and in the aggregate, to the financial statements taken as a whole. `,
                  ),
                  newTableRowFourCol(
                    `2.5.`,
                    `В случаях публикации или распространения в электронной форме аудиторского заключения с прилагаемой бухгалтерской (финансовой) отчетностью Заказчика, указанных в пункте 1.1 настоящего Договора, Заказчик несет ответственность за то, чтобы аудиторское заключение с прилагаемой бухгалтерской (финансовой) отчетностью Заказчика было представлено надлежащим образом. Заказчик обязуется при этом обеспечить, чтобы формат размещения на его веб-сайте финансовой информации позволял четко отделить проаудированную бухгалтерскую (финансовую) отчетность Заказчика от прочей информации и не допускал неоднозначного толкования или ввода в заблуждение ее пользователей.`,
                    `In the cases of publishing or publication in electronic form of an Auditor’s Report with the attached the Client’s financial statements specified in clause 1.1. of this Agreement, the Client is responsible for ensuring that the Auditor’s Report with the attached the Client’s financial statements is properly presented. The Client undertakes at the same time to ensure that the form of the placement on its website of financial information makes it possible to clearly separate the audited financial statements of the Client  from other information and do not allow ambiguous interpretation or misleading of its users.`,
                  ),
                  newTableRowFourCol(
                    `2.6.`,
                    `Заказчик имеет право:`,
                    `The Client shall have the right:`,
                    true,
                  ),
                  newTableRowFourCol(
                    `2.6.1`,
                    `Получать от Аудитора на основании собственных запросов информацию о требованиях законодательства и соответствующих Стандартов аудита, касающихся процедуры проведения аудита.`,
                    `To obtain required information from the Auditor about the requirements of the law and the relevant Audit Standards regarding the procedure of conducting the audit.`,
                  ),
                  newTableRowFourCol(
                    `2.6.2`,
                    `Получать на основании собственных запросов информацию от Аудитора о нормативных актах и Стандартах аудита, на которых основываются содержащиеся в Аудиторских заключениях и Иных Отчетах замечания и выводы.`,
                    `To obtain required information from the Auditor about the requirements of the law and the relevant Standards on Auditing, on which the conclusions in the Auditor’s Report or in other reports is based.`,
                  ),
                  newTableRowFourCol(
                    `2.6.3`,
                    `Во всякое время проверять ход выполняемых работ, не вмешиваясь в деятельность Аудитора.`,
                    `To check at any time the progress of the performed work, without interfering the activities of the Auditor.`,
                  ),
                  newTableRowFourCol(
                    `2.6.4`,
                    `Осуществлять иные права, вытекающие из настоящего Договора.`,
                    `To implement other rights arising from this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `2.7.`,
                    `Аудитор обязуется:`,
                    `The Auditor agrees and undertakes:`,
                    true,
                  ),
                  newTableRowFourCol(
                    `2.7.1`,
                    `Провести аудит в соответствии с требованиями Федерального закона от 30 декабря 2008 г. № 307-ФЗ “Об аудиторской деятельности”, Международными стандартами аудита, Правилами независимости аудиторов и аудиторских организаций, Кодексом профессиональной этики аудиторов, действующим законодательством Российской Федерации, сложившейся практикой Аудитора.`,
                    `To conduct an audit in accordance with the requirements of Federal Law No. 307-FL of 30 December 2008 “On Auditing”, the International Standards on Auditing, the Rules of the Independence of Auditors and Audit Organizations, the Code of Professional Ethics of Auditors, the current legislation of the Russian Federation, and the established practice of the Auditor.`,
                  ),
                  newTableRowFourCol(
                    `2.7.2`,
                    `Спланировать и проводить аудит таким образом, чтобы получить достаточную уверенность в том, что бухгалтерская (финансовая) отчетность Заказчика не содержит существенных искажений.`,
                    `To plan and to conduct the audit in such a way as to obtain sufficient confidence that the Client's financial statements do not contain material misstatements.`,
                  ),
                  newTableRowFourCol(
                    `2.7.3`,
                    `В процессе проведения аудита извещать Заказчика в письменной форме о значительных недостатках в системе внутреннего контроля, которые, по мнению Аудитора, должны быть доведены до сведения Заказчика. Значительным недостатком системы внутреннего контроля является недостаток или сочетание недостатков в системе внутреннего контроля, которые, согласно профессиональному суждению аудитора, являются достаточно важными и поэтому заслуживают внимания Заказчика и лиц, отвечающих за корпоративное управление.`,
                    `To notify the Client during the audit, in writing of significant disadvantages in the control environment, which, in the opinion of the Auditor, should in the attention of the Client. A significant disadvantage of the internal control system is the lack or combination of defect in the control environment, which, according to the auditor's professional judgment, are sufficiently important and therefore deserve the Clients's attention and those charged with governance.`,
                  ),
                  newTableRowFourCol(
                    `2.7.4`,
                    `Предоставлять по требованию Заказчика необходимую информацию о требованиях законодательства Российской Федерации, касающихся проведения аудиторской проверки, нормативных актах Российской Федерации, а также МСФО, на которых основываются замечания и выводы Аудитора.`,
                    `To provide, at the request of the Client, the necessary information about the requirements of the law of the Russian Federation relating to the conduction of the audit, the regulatory acts of the Russian Federation, and IFRS, on which the Auditor's comments and conclusions are based.`,
                  ),
                  newTableRowFourCol(
                    `2.7.5`,
                    `В процессе проведения Аудита организовать свою работу таким образом, чтобы не осложнять текущую деятельность Заказчика.`,
                    `In the process of conducting the Audit, to organize the work in such a way as not to complicate the current activities of the Client.`,
                  ),
                  newTableRowFourCol(
                    `2.7.6`,
                    `Соблюдать требования об обеспечении конфиденциальности информации, составляющей аудиторскую тайну, в соответствии с Статьей 7 настоящего Договора.`,
                    `To observe the requirements for confidentiality of information that constitutes an audit secret in accordance with clause 7 of this agreement.`,
                  ),
                  newTableRowFourCol(
                    `2.7.7`,
                    `Обеспечивать сохранность оригиналов документов, получаемых от Заказчика в ходе оказания услуг по настоящему Договору, и по окончании Аудита возвратить их Заказчику.`,
                    `To ensure the preservation of the originals of documents received from the Client during the provision of services under this Agreement, and upon the completion of the Audit to return them to the Client.`,
                  ),
                  newTableRowFourCol(
                    `2.7.8`,
                    `Передать в срок, установленный настоящим Договором, Аудиторское заключение Заказчику.`,
                    `To transfer the Auditor’s Report to the Client within the time period established by this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `2.8.`,
                    `Аудитор имеет право:`,
                    `The Auditor shall have the right:`,
                    true,
                  ),
                  newTableRowFourCol(
                    `2.8.1`,
                    `Самостоятельно определять формы и методы оказания аудиторских услуг в рамках действующих Стандартов аудита.`,
                    `To determine independently the forms and methods of providing audit services within the framework of the current Audit Standards.`,
                  ),
                  newTableRowFourCol(
                    `2.8.2`,
                    `Проверять у Заказчика в полном объеме документацию о финансово-хозяйственной деятельности, наличие любого имущества, отраженного в этой документации, получать информацию, включая письменные разъяснения, по возникшим вопросам и дополнительные сведения для исполнения настоящего Договора. Копии необходимых документов представляются Заказчиком в случае согласия в разумные сроки после получения предварительного письменного запроса Аудитора.`,
                    `To carry out a full audit of the Client’s documents on its financial and economic activities, availability of any property reflected in this documentation, to receive information, including written explanations on the issues raised and additional information for the implementation of this Agreement. Copies of necessary documents are submitted by the Client in case of agreement within a reasonable period after receiving the preliminary written request of the Auditor.`,
                  ),
                  newTableRowFourCol(
                    `2.8.3`,
                    `Получать по письменному запросу необходимую для осуществления аудита информацию напрямую от третьих лиц, банков и государственных органов. Аудитор будет исходить из того, что предоставленная ему таким образом информация достоверна.`,
                    `To receive, upon a written request, information necessary for the audit directly from third parties, banks and government agencies. The auditor will proceed from the fact that the information provided to him in this way is reliable.`,
                  ),
                  newTableRowFourCol(
                    `2.8.4`,
                    `Получать у должностных лиц Заказчика разъяснения и подтверждения в устной и письменной форме по возникшим в ходе аудита вопросам.`,
                    `To receive explanations and verifications from the Client's officials in oral and written form on the issues arising during the audit.`,
                  ),
                  newTableRowFourCol(
                    `2.8.5`,
                    `Посещать помещение Заказчика в течение рабочего дня и, при необходимости, во внерабочее время после согласования с Заказчиком.`,
                    `To visit the premises of the Client during the working day and, if necessary, outside working hours after the agreement with the Client.`,
                  ),
                  newTableRowFourCol(
                    `2.8.6`,
                    `В случае необходимости при выполнении Договора Аудитор вправе по согласованию с Заказчиком привлекать к оказанию услуг третьих лиц, при этом Аудитор несет ответственность за действия таких лиц как за свои собственные.`,
                    `If necessary, in the performance of the Agreement, the Auditor has the right, in agreement with the Client, to involve third parties in the provision of services, while the Auditor is responsible for the actions of such persons as for their own.`,
                  ),
                  newTableRowFourCol(
                    `2.8.7`,
                    `Осуществлять иные права, вытекающие из настоящего Договора.`,
                    `To implement other rights arising from this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `2.9.`,
                    `Стороны обязуются своевременно информировать друг друга о возникающих затруднениях, которые препятствуют выполнению работы по данному Договору не позже дня, следующего за днем, когда стороне стало известно о наличии указанных обстоятельств.`,
                    `The parties shall take an obligation to timely notify each other of any problems affecting the completion of work under this Agreement and at least 1 (one) business days after the occurrence of the problem, when the party became aware of the existence of these circumstances.`,
                  ),
                  newTableRowFourCol(
                    `2.10.`,
                    `Стороны вправе осуществлять обмен информацией и документами, вести рабочую переписку по вопросам, связанным с исполнением настоящего Договора, направлять результаты услуг, акты об оказании услуг и иные документы, касающиеся настоящего Договора, с помощью корпоративных средств электронной и телефонной связи. Стороны обязуются отправлять электронные сообщения только путем использования принадлежащих им корпоративных доменов.`,
                    `The parties have the right to exchange information and documents, conduct working correspondence on issues related to the implementation of this Agreement, send results of services, acts on the provision of services and other documents relating to this Agreement, using corporate electronic and telephone communication facilities. Parties undertake to send electronic messages only by using their corporate domains.`,
                  ),
                  newTableRowFourCol(
                    `3.`,
                    `СРОКИ ОКАЗАНИЯ УСЛУГ`,
                    `DURATION OF WORK`,
                    true,
                  ),
                  newTableRowFourCol(
                    `3.1.`,
                    `Сроки оказания Услуг Аудитором приводятся в Приложении № 1 к настоящему Договору.`,
                    `The timeframe of Services provided by the Auditor are specified in Annex 1 to this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `3.2.`,
                    `Сроки оказания Услуг могут быть изменены по взаимной договоренности Сторон или в связи с обстоятельствами, изложенными в пункте 5.1. настоящего Договора.`,
                    `The timeframe of Services provided by the Auditor may be changed by mutual agreement of the Parties or in connection with the circumstances set out in clause 5.1. of this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `3.3.`,
                    `Окончание предоставления услуг оформляется двусторонним Актом об оказании услуг, который подписывается полномочными представителями обеих Сторон. Услуги считаются оказанными на дату подписания обеими Сторонами Акта об оказании услуг.`,
                    `The completion of the provision of services is formalized by a bilateral Service Act, which is signed by authorized representatives of both Parties. Services are deemed rendered as of the date of signing by both Parties of the Service Act.`,
                  ),
                  newTableRowFourCol(
                    `3.4.`,
                    `В случае если Заказчик в течение 5 (пяти) рабочих дней не подписывает акт об оказании услуг и не возвращает один экземпляр данного документа Аудитору или не направляет Аудитору мотивированный отказ от подписания акта, Услуги Аудитора считаются принятыми, а Акт – подписанным.`,
                    `In the event that the Client does not sign an act of rendering services within five (5) business days and does not return one copy of this document to the Auditor or sends a reasoned refusal to sign the certificate to the Auditor, the Auditor's Services are deemed to be accepted and the Act signed.`,
                  ),
                  newTableRowFourCol(
                    `3.5.`,
                    `Для обмена документами с использованием систем электронного документооборота Стороны соглашаются при осуществлении взаимоотношений между собой принимать к сведению и исполнению следующие документы в электронном виде, подписанные усиленной квалифицированной электронной подписью (далее – ЭП, или “электронная подпись”), посредством согласованной сторонами Системы защищенного юридически значимого электронного документооборота: договоры и дополнительные соглашения, акты оказанных услуг, счета-фактуры, счета на оплату. Стороны признают, что направленные и полученные ими в соответствии с условиями, определенными настоящим пунктом Договора, электронные документы, подписанные корректной ЭП уполномоченных лиц сторон, признаются равнозначными документам на бумажном носителе, подписанным собственноручной подписью и заверенным оттиском печати, соответствуют письменной форме документов, и порождают права и обязанности сторон при выполнении взаимных обязательств сторон. Электронные документы, подписанные корректной ЭП, являются оригиналами, имеют юридическую силу и могут использоваться, в частности, в качестве доказательств в суде, а также при рассмотрении споров в досудебном порядке. Формирование и обмен документами в электронном виде, указанными в настоящем пункте Договора, осуществляется в системе оператора ЭДО по выбору сторон. Операторы, выбранные каждой стороной Договора, должны отвечать требованиям, установленным к операторам электронного документооборота действующим законодательством. При осуществлении электронного документооборота (далее – “ЭДО”) стороны руководствуются законодательством Российской Федерации, в частности, Федеральным законом от 06.04.2011 № 63-ФЗ “Об электронной подписи” (со всеми изменениями и дополнениями).`,
                    `For the exchange of documents using electronic document management systems, the Parties agree to take into account and execute the following documents in electronic form, signed with an enhanced qualified electronic signature (hereinafter referred to as the ES, or “electronic signature”), through a System of protected legally significant electronic document management agreed by the parties: contracts and additional agreements, acts of rendered services, invoices, invoices for payment. The parties acknowledge that electronic documents sent and received by them in accordance with the conditions defined by this paragraph of the Agreement, signed by the correct ES of authorized persons of the parties, are recognized as equivalent to paper documents signed with a handwritten signature and a certified seal, correspond to the written form of the documents, and give rise to the rights and obligations of the parties in fulfilling mutual obligations of the parties. Electronic documents signed with a correct ES are originals, have legal force and can be used, in particular, as evidence in court, as well as when considering disputes in a pre-trial manner. The formation and exchange of documents in electronic form specified in this paragraph of the Agreement is carried out in the EDМ operator's system at the choice of the parties. The operators selected by each party to the Agreement must meet the requirements established for electronic document management operators by the current legislation. When carrying out electronic document management (hereinafter referred to as “EDМ”), the parties are guided by the legislation of the Russian Federation, in particular, Federal Law No. 63-FZ dated 06.04.2011 “On Electronic Signature” (with all amendments and additions).`,
                  ),
                  newTableRowFourCol(
                    `4.`,
                    `СТОИМОСТЬ УСЛУГ И ПОРЯДОК ОПЛАТЫ`,
                    `COST OF SERVICESAND PAYMENT PROCEDURES`,
                    true,
                  ),
                  newTableRowFourCol(
                    `4.1.`,
                    `Стоимость оказанных Аудитором Услуг по пункту 1.1. настоящего Договора составляет ${
                      data.cost.contractPrice
                      // TODO добавить конвертер числа в буквенное представление (напр., 1 500 000 - один миллин пятьсот тысяч)
                    } (${convertNum(data.cost.contractPrice)}) рублей${
                      data.cost.contractVAT === "yes"
                        ? `, увеличенного на сумму НДС, применимого на дату оказания услуг`
                        : `. НДС не облагается в соответствии с гл. 26.2. НК РФ`
                    }.`,
                    `The cost of services completed by the Auditor per Clause 1.1. of this Agreement is ${
                      data.cost.contractPrice
                    } (${convertNumEng(data.cost.contractPrice)}) rubles${
                      data.cost.contractVAT === "yes"
                        ? `, increased by the amount of the VAT applicable on the date of service delivery`
                        : `. VAT is not levied in accordance with Ch. 26.2. Tax Code of the Russian Federation`
                    }.`,
                  ),
                  newTableRowFourCol(
                    `4.2.`,
                    `Заказчик осуществляет оплату услуг Аудитора в соответствии с графиком, указанным в Приложении 2 к настоящему Договору.`,
                    `The Client shall pay the Auditor in accordance with the schedule indicated in Annex 2 to this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `4.3.`,
                    `Порядок и размер оплаты не зависят от содержания выводов Аудитора.`,
                    `The procedure and the amount of payment don’t depend on the content of the Auditor's findings.`,
                  ),
                  newTableRowFourCol(
                    `4.4.`,
                    `Заказчик производит оплату на основании счетов, выставляемых Аудитором. Счет должен быть оплачен в течение 5 (пяти) банковских дней со дня его получения.`,
                    `The Client shall make payments in accordance with invoices issued by the Auditor. The invoice must be paid within 5 (five) banking days from the date it was received.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Форма оплаты - безналичный расчет по платежному поручению.`,
                    `Form of payment - non-cash payment on a payment order.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Обязательства Заказчика по оплате услуг считаются исполненными с момента зачисления денежных средств на расчетный счет Аудитора.`,
                    `The Client's obligations to pay for services are considered fulfilled from the moment the funds are credited to the Auditor's current account.`,
                  ),
                  newTableRowFourCol(
                    `4.5.`,
                    `Общая стоимость услуг Аудитора складывается из стоимости услуг, указанной в пункте 4.1. настоящего Договора, увеличенной на сумму документально подтвержденных расходов, понесенных Аудитором в связи с оказанием услуг по месту нахождения Заказчика за пределами Москвы, а именно расходы, связанные с переездом, проживанием в гостинице, дополнительные расходы, связанные с проживанием вне места постоянного жительства работников Аудитора (суточные), установленные локальным актом Аудитора, иные расходы. Сумма документально подтвержденных расходов, понесенных Аудитором в связи с оказанием услуг по месту нахождения Заказчика, увеличивается на сумму НДС, рассчитанную по ставке в соответствии с законодательством РФ о налогах и сборах на дату оказания услуг.`,
                    `The total cost of the Auditor's services consists of the cost of the services specified in clause 4.1. of this Agreement, increased by the amount of documented expenses incurred by the Auditor in connection with the provision of services at the Client's location outside Moscow, specifically, expenses related to relocation, hotel accommodation, additional expenses related to living outside the place of permanent residence of the Auditor's employees (daily allowances) established by the local act of the Auditor, other expenses. The amount of documented expenses incurred by the Auditor in connection with the provision of services at the Client's location is increased by the amount of VAT calculated at the rate in accordance with the legislation of the Russian Federation on taxes and fees on the date of service delivery.`,
                  ),
                  newTableRowFourCol(
                    `4.6.`,
                    `Дополнительные услуги, оказываемые Аудитором Заказчику в рамках профессиональной деятельности Аудитора, по вопросам, не относящимся к предмету настоящего Договора, подлежат согласованию Сторонами, оформляются отдельным договором и должны быть оплачены Заказчиком отдельно.`,
                    `Any additional professional services required by the Client beyond those specified within this Agreement shall be the subject of discussion between the parties under a separate contract and shall be paid for separately by the Client.`,
                  ),
                  newTableRowFourCol(
                    `5.`,
                    `ДОПОЛНИТЕЛЬНЫЕ РАБОТЫ И ЗАТРАТЫ`,
                    `EXTRA WORK AND COSTS`,
                    true,
                  ),
                  newTableRowFourCol(
                    `5.1.`,
                    `Дополнительная (к сумме, указанной в пункте 4.1. настоящего Договора) стоимость работ, рассчитанная на основе дополнительного времени на выполнение работ, будет оплачена Заказчиком при условии согласования Сторонами необходимости проведения дополнительных работ, а также размера дополнительной оплаты за них в порядке, предусмотренном пунктом 5.2. настоящего Договора.`,
                    `Extra cost (to the amount identified in clause 4.1. of this Agreement) based on the additional time for performance of services, will be paid by the Client provided that the Parties agree on the need for additional work, as well as the amount of additional payment for them in accordance with the procedure provided in clause 5.2. of this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `5.2.`,
                    `Дополнительные затраты, подпадающие под определение, приведенное в пункте 5.1. настоящего Договора, а также любые другие расходы, влияющие на общую стоимость проводимой аудиторской работы, должны согласовываться Сторонами. Аудитор сообщает Заказчику о возникновении подобных обстоятельств в письменной форме. В этом случае увеличение стоимости работ Аудитора подлежит согласованию Сторонами и оформляется дополнительным соглашением к настоящему Договору.`,
                    `Extra costs under the provision of clause 5.1. of this Agreement and other expenses affecting the total cost of the work shall be agreed upon mutual agreement of the parties. The Auditor informs the Client about occurrence of similar circumstances in written form. In this case, an increase in the cost of the Auditor’s work is subject to agreement by the Parties and is formalized by an additional agreement to this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `5.3.`,
                    `В случае выполнения Аудитором дополнительных работ, в порядке, установленном настоящей Статьей, соразмерно объемам этих дополнительных работ могут корректироваться сроки выполнения работ по Договору в соответствии с дополнительным соглашением сторон, указанным в пункте 5.1. настоящего Договора.`,
                    `Should the Auditor complete extra works as set out in this Clause the completion dates may be adjusted respective to the scope of extra work in accordance with the additional agreement of the parties specified in clause 5.1. of this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `5.4.`,
                    `Аудитор не вправе требовать увеличения сроков выполнения работ и уплаты Заказчиком дополнительных платежей в случае, если необходимость этого не обусловлена неисполнением Заказчиком своих обязательств из настоящего Договора.`,
                    `The Auditor does not have the right to demand an increase in the deadlines for the execution of work and the payment by the Client of additional payments in the event that the need for this is not due to the Client's failure to fulfill its obligations under this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `6.`,
                    `ОТВЕТСТВЕННОСТЬ СТОРОН`,
                    `RESPONSIBILITIES OF THE PARTIES`,
                    true,
                  ),
                  newTableRowFourCol(
                    `6․1․`,
                    `За неисполнение или ненадлежащее исполнение обязательств по настоящему договору Стороны несут ответственность в соответствии с законодательством Российской Федерации.`,
                    `For failure or improper performance of obligations under this agreement, the Parties are liable in accordance with the law of the Russian Federation.`,
                  ),
                  newTableRowFourCol(
                    `6.2.`,
                    `Ответственность Аудитора перед Заказчиком в отношении любого реального ущерба, возникшего у Заказчика в результате или как следствие оказываемых Аудитором Услуг согласно настоящему Договору, ограничивается суммой вознаграждения, полученной Аудитором за оказанные по настоящему Договору Услуги. Аудитор не обязан возмещать Заказчику упущенную выгоду или косвенные убытки. `,
                    `The responsibility of the Auditor to the Client in respect of any actual damage incurred by the Client as a result of or as a result of the services rendered by the Service's Auditor pursuant to this Agreement is limited to the amount of remuneration received by the Auditor for services rendered under this agreement. The auditor is not obliged to compensate the Client for lost profits or indirect losses.`,
                  ),
                  newTableRowFourCol(
                    `6.3.`,
                    `Ответственность за полноту и достоверность информации, предоставленной Аудитору для целей аудита, несет Заказчик и сторона, предоставившая информацию по запросу Аудитора.`,
                    `Responsibility for the completeness and reliability of information provided to the Auditor for audit purposes is borne by the Client and the party that provided the information at the request of the Auditor.`,
                  ),
                  newTableRowFourCol(
                    `6.4.`,
                    `Аудитор не несет какую-либо ответственность в случаях предъявления налоговым органом претензий к Заказчику. Акт налогового органа не может являться достаточным доказательством ненадлежащего исполнения Аудитором обязательств по настоящему Договору. Аудитор не несет ответственность за не обнаружение искажений бухгалтерской (финансовой) отчетности в случае, если это не могло повлиять на мнение Аудитора относительно достоверности бухгалтерской (финансовой) отчетности в целом. `,
                    `The Auditor does not bear any responsibility in cases of presentation of claims to the Client by the tax authority. The act of the tax authority can not be sufficient proof of the improper performance by the Auditor of the obligations under this Agreement. The Auditor does not bear responsibility for not finding distortions of the financial statements in case this could not affect the Auditor's opinion on the reliability of the financial statements as a whole.`,
                  ),
                  newTableRowFourCol(
                    `6.5.`,
                    `Аудитор не несет ответственность за нарушение сроков оказания Услуг по настоящему Договору вследствие неисполнения и/или ненадлежащего исполнения Заказчиком обязательств в соответствии с пунктом 1.1. Приложения 1 к настоящему Договору.`,
                    `The Auditor shall not be liable for violation of the terms of provision of the Services under this Agreement due to non-fulfillment and / or improper performance by the Client of the obligations in accordance with clause 1.1. Annex 1 to this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `7.`,
                    `КОНФИДЕНЦИАЛЬНОСТЬ И ИСПОЛЬЗОВАНИЕ РЕЗУЛЬТАТОВ РАБОТЫ`,
                    `CONFIDENTIALITY AND UTILIZATION OF THE RESULTS`,
                    true,
                  ),
                  newTableRowFourCol(
                    `7.1.`,
                    `Аудитор обязан соблюдать требования об обеспечении конфиденциальности информации, составляющей аудиторскую тайну, согласно требованиям Федерального закона от 30 декабря 2008 года № 307-ФЗ “Об аудиторской деятельности”, в том числе после завершения аудита. За несоблюдение конфиденциальности коммерческой информации Заказчика Аудитор несет ответственность в соответствии с законодательством Российской Федерации. `,
                    `The auditor is obliged to comply with the requirements to ensure confidentiality of information that constitutes an audit secret, in accordance with the requirements of Federal Law No. 307-FZ of 30 December 2008 “On Auditing”, including after the audit is completed. For non-observance of confidentiality of the Client's commercial information, the Auditor is liable in accordance with the legislation of the Russian Federation.`,
                  ),
                  newTableRowFourCol(
                    `7.2.`,
                    `Стороны обязаны обеспечивать сохранность сведений и документов, получаемых и (или) составляемых ими при осуществлении аудита, и не вправе передавать указанные сведения и документы или их копии третьим лицам либо разглашать их без письменного согласия на то каждой Стороны, за исключением случаев, предусмотренных Федеральным законом “Об аудиторской деятельности” и другими федеральными законами.`,
                    `The parties are obliged to ensure the safety of information and documents received and (or) compiled by them in the course of the audit and shall not have the right to transfer the specified information and documents or their copies to third parties or disclose them without the written consent of each Party, with the exception of cases provided for by the Federal Law “On Auditing” and other federal laws.`,
                  ),
                  newTableRowFourCol(
                    `7.3.`,
                    `Подписывая настоящий Договор, Заказчик выражает свое информированное согласие на хранение любой информации и документов, переданных Аудитору и составленных Аудитором в процессе проведения аудиторской проверки, включая за текущий и предыдущие периоды, у третьих лиц, с которыми Аудитором заключены и действуют договоры об ответственном хранении документов. `,
                    `By signing this Agreement, the Client expresses its informed consent for the storage of any information and documents provided to the Auditor and compiled by the Auditor in the course of the audit, including for the current and previous periods, from third parties with whom the Contracts for the safe custody of documents have been concluded and in effect.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `В случае передачи вышеуказанной информации и документов на хранение третьим лицам, Аудитор обязуется обеспечить их хранение в полном соответствии с требованиями Федерального Закона от 20 декабря 2008 года № 307-ФЗ “Об аудиторской деятельности”. `,
                    `In the event that the above information and documents are transferred to third parties for storage, the Auditor undertakes to ensure their storage in full compliance with the requirements of Federal Law No. 307-FZ of December 20, 2008 on Auditing.`,
                  ),
                  newTableRowFourCol(
                    ``,
                    `Аудитор также гарантирует, что заключенные им договоры об ответственном хранении документов:- содержат условия об обеспечении хранителем режима конфиденциальности в отношении переданной ему на хранение информации и документов;- заключены надлежащим образом в соответствии с законодательством Российской Федерации, с учетом требований Федерального Закона “Об аудиторской деятельности”.`,
                    `The Auditor also guarantees that the contracts concluded with him on the responsible storage of documents:- contain the conditions for providing the custodian with a confidentiality regime in respect of information and documents transferred to it;- are duly executed in accordance with the legislation of the Russian Federation, taking into account the requirements of the Federal Law “On Auditing”.`,
                  ),
                  newTableRowFourCol(
                    `7.4.`,
                    `В соответствии с законодательством Российской Федерации от одной из Сторон может потребоваться предоставление в соответствующие органы информации, связанной с исполнением настоящего Договора, а также может возникнуть ситуация изъятия указанными органами документов, имеющих отношение к исполнению обязательств по настоящему Договору. Данные ситуации не являются нарушением условий конфиденциальности. В рамках, в которых позволяет законодательство, данная Сторона будет извещать другую Сторону о таких обстоятельствах.`,
                    `In accordance with the legislation of the Russian Federation, one of the Parties may require the provision to the relevant bodies of information related to the implementation of this Agreement, and there may also be a situation of withdrawal by these authorities of documents related to the performance of obligations under this Agreement. These situations do not violate the terms of confidentiality. Within the framework in which legislation permits, the Party will notify the other Party of such circumstances.`,
                  ),
                  newTableRowFourCol(
                    `7.5.`,
                    `Результаты работы Аудитора будут представлены Заказчику в форме Аудиторского заключения, как это указано в пункте 1.1. настоящего Договора. Заказчик может предоставлять экземпляры Аудиторского заключения и относящейся к нему бухгалтерской (финансовой) отчетности Заказчика внутренним и внешним пользователям данной отчетности. `,
                    `The results of the work of the Auditor will be presented to the Client in the form of an Auditor's report, as specified in clause 1.1. of this Agreement. The Client may provide copies of the Auditor's report and the related financial statements of the Client to internal and external users of this reporting.`,
                  ),
                  newTableRowFourCol(
                    `7.6.`,
                    `Рабочие документы, подготовленные Аудитором в ходе проведения аудиторской проверки (включая копии документов как на бумажном, так и в электронном виде, которые были первоначально составлены Заказчиком или третьими лицами), являются собственностью Аудитора и находятся у него на хранении. Аудитор обязан хранить эти документы в течение периода, определенного российским законодательством. Аудитор несет ответственность за сохранение конфиденциальности, содержащейся в них информации в полном объеме, предусматривающую возмещение реального ущерба, причиненного Заказчику вызванного частичной или полной утратой переданной информацией конфиденциальности по вине Аудитора.`,
                    `Working documents prepared by the Auditor during the audit (including copies of documents, both in paper form and in electronic form, which were originally compiled by the Client or by third parties) are the property of the Auditor and are kept in his possession. The auditor is required to keep these documents for a period specified by Russian law. The auditor is responsible for maintaining the confidentiality of the information contained in them in full, providing for the compensation of actual damage caused to the Client caused by the partial or total loss of confidential information transmitted through the Auditor's fault.`,
                  ),
                  newTableRowFourCol(
                    `7.7.`,
                    `Стороны вправе вести переписку и пересылать документацию по электронной почте через сеть Интернет, по факсу или по почте. Ни одна из Сторон не несет ответственности за какой бы то ни было убыток, ущерб, расходы, вред или неудобство, возникшие в результате утраты, задержки, перехвата, искажения или изменения передаваемого по электронной почте через сеть Интернет, факсу или почте отправления по любой причине вне разумного контроля соответствующей Стороны.`,
                    `The Parties may correspond or convey documentation and information via Internet e-mail, fax or mail.  Neither Party shall be liable for any loss, damage, expense, harm or inconvenience resulting from the loss, delay, interception, corruption, or alteration of any Internet e-mail, fax, or mail due to any reason beyond the relevant Party’s reasonable control.`,
                  ),
                  newTableRowFourCol(
                    `8.`,
                    `ОБСТОЯТЕЛЬСТВА НЕПРЕОДОЛИМОЙ СИЛЫ (ФОРС-МАЖОР)`,
                    `FORCE MAJEURE`,
                    true,
                  ),
                  newTableRowFourCol(
                    `8.1.`,
                    `Ни одна из Сторон не несет ответственности в случае невыполнения своих обязательств ввиду действия обстоятельств непреодолимой силы, то есть таких, которые она не могла ни предвидеть, ни предотвратить,  например,  стихийные бедствия (пожары, наводнения, землетрясения и т.п.), социальные конфликты (забастовки, гражданские войны и т.п.), а также издание законодательных актов, значительно осложняющих, ограничивающих или запрещающих  исполнение Сторонами своих обязательств,  из настоящего Договора. `,
                    `Neither party shall be responsible for failure to complete its obligations due to force majeure, such as will of God (fires, floods, earth quakes etc), social conflicts (strikes, civil wars etc) and publication of the laws rendering the completion of works under this Agreement impossible.`,
                  ),
                  newTableRowFourCol(
                    `8.2.`,
                    `Сторона, не исполняющая обязательства по настоящему Договору в силу возникновения обстоятельств непреодолимой силы, обязана в течение 5 (пяти) рабочих дней проинформировать другую Сторону о наступлении таких обстоятельств в письменной форме. Подобная информация должна содержать данные о характере обстоятельств непреодолимой силы, а также, по возможности, оценку их влияния на исполнение и возможный срок исполнения обязательств по настоящему Договору.`,
                    `The Party not performing its obligations under this Agreement due to the appearance of force-majeure circumstances shall be obligated to inform the other Party in writing within 5 (five) business days of the onset of such circumstances. Such information should include the nature of such force-majeure circumstances, and also, where possible, an estimate of their effect on the performance of obligations and the possible deadline for the performance of obligations under this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `8.3.`,
                    `По прекращении действия указанных обстоятельств потерпевшая Сторона должна направить письменное уведомление об этом в соответствии с пунктом 8.2. настоящего Договора другой Стороне с указанием срока, в который предполагается исполнить обязательства по настоящему Договору и должна предпринять все меры для ограничения и минимизации эффекта данных обстоятельств.`,
                    `On the expiration of the aforementioned circumstances, the Party that is effected by these circumstances must immediately inform the other Party thereof in writing according to clause 8.2 of this Agreement, indicating the presumed period required to perform its obligations under this Agreement and must promptly take all necessary measures to limit and minimize the effect of these circumstances.`,
                  ),
                  newTableRowFourCol(
                    `8.4.`,
                    `В случае возникновения обстоятельств непреодолимой силы срок исполнения обязательств по настоящему Договору продлевается на срок действия обстоятельств непреодолимой силы и их последствий, в случае если данные обстоятельства будут продолжаться в течение более 5 (пяти) рабочих дней.`,
                    `If force-majeure circumstances occur, the term for carrying out obligations under this Agreement shall be extended commensurate to the duration of force-majeure circumstances and their consequences, unless these circumstances will last more than 5 (five) business days.`,
                  ),
                  newTableRowFourCol(
                    `8.5.`,
                    `В том случае, если обстоятельства непреодолимой силы препятствуют одной из Сторон выполнить ее обязательства в течение срока, превышающего 5 (пять) рабочих дней, или если после их наступления выяснится, что они будут длиться более 5 (пяти) рабочих дней, любая из Сторон должна направить другой Стороне уведомление с предложением о проведении переговоров с целью определения взаимоприемлемых условий выполнения обязательств по настоящему Договору или прекращения действия настоящего Договора.`,
                    `If force-majeure circumstances prevent one of the Parties from performing its obligations for more than 5 (five) business days, or if after their discovery it becomes clear that they will last over 5 (five) business days, either Party must send the other Party a written notification with a proposal to conduct negotiations on this matter in the interests of determining mutually acceptable terms for performing contractual obligations or terminating this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `8.6.`,
                    `Досрочное прекращение или приостановление Договора не освобождает Заказчика от обязательств по оплате выполненной Аудитором работы и понесенных расходов на момент наступления события, предусмотренного пунктом 8.1. настоящего Договора.`,
                    `Early termination of the Agreement shall not free the Client from payments for completed works and expenses incurred by the Auditor prior to circumstances mentioned in clause 8.1. of this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `9.`,
                    `РАЗРЕШЕНИЕ СПОРОВ`,
                    `DISPUTES`,
                    true,
                  ),
                  newTableRowFourCol(
                    `9.1.`,
                    `Любые споры и разногласия, которые могут возникнуть в ходе выполнения настоящего Договора, подлежат урегулированию путем переговоров уполномоченных представителей Сторон.`,
                    `Any dispute arising from this Agreement shall be negotiated by authorized representatives of the parties.`,
                  ),
                  newTableRowFourCol(
                    `9.2.`,
                    `В случае невозможности разрешения споров путем переговоров, они подлежат передаче на разрешение в Арбитражный суд г. Москвы.`,
                    `Should the parties fail to resolve an issue by negotiations, the dispute will be forwarded to the Court of Arbitration.`,
                  ),
                  newTableRowFourCol(
                    `10.`,
                    `ПРОЧИЕ УСЛОВИЯ`,
                    `OTHER TERMS`,
                    true,
                  ),
                  newTableRowFourCol(
                    `10.1.`,
                    data.terms.contractSign === "paper"
                      ? `Настоящий Договор вступает в силу со дня подписания его Сторонами и действует до полного выполнения Сторонами принятых ими на себя обязательств и урегулирования всех платежей и расчетов.`
                      : `Настоящий Договор вступает в силу с ${data.key.contractDate} и действует до полного выполнения Сторонами принятых ими на себя обязательств и урегулирования всех платежей и расчетов.`,
                    data.terms.contractSign === "paper"
                      ? `This Agreement shall be made effective upon its execution by the parties and stay valid until entire completion of their obligations by the parties and full settlement of payments.`
                      : `This Agreement shall be made effective from ${data.key.contractDateEng} and stay valid until entire completion of their obligations by the parties and full settlement of payments.`,
                  ),
                  newTableRowFourCol(
                    `10.2.`,
                    `Настоящий Договор может быть расторгнут:`,
                    `The Agreement may be terminated:`,
                  ),
                  newTableRowFourCol(
                    `10.2.1`,
                    `По письменному взаимному согласию Сторон.`,
                    `By written mutual agreement of the Parties,`,
                  ),
                  newTableRowFourCol(
                    `10.2.2`,
                    `По требованию одной из Сторон, в случае неоднократного нарушения условий выполнения данного Договора другой Стороны, при уведомлении другой Стороны за 30 (тридцать) календарных дней.`,
                    `At the request of either Party in the event of multiple contractual shortcomings on behalf of the defaulting Party provided that a notice is given in writing at least 30 calendar days beforehand.`,
                  ),
                  newTableRowFourCol(
                    `10.2.3`,
                    `Заказчик вправе досрочно расторгнуть настоящий Договор, при условии обязательного письменного уведомления Аудитора не менее, чем за 10 (Десять) рабочих дней до предполагаемой даты расторжения настоящего Договора и компенсации расходов, понесенных Аудитором и определяемых на основании действующих почасовых ставок специалистов Аудитора, представленным в Приложении № 3 к настоящему договору.`,
                    `The Client has the right to terminate this Agreement ahead of time, subject to mandatory written notification of the Auditor not less than 10 (Ten) working days prior to the expected date of termination of this Agreement and compensation of expenses incurred by the Auditor and determined on the basis of the hourly rates of the Auditor's specialists presented in Appendix No. 3 to this Agreement.`,
                  ),
                  newTableRowFourCol(
                    `10.3.`,
                    `Досрочное прекращение Договора, любые изменения, дополнения и приложения к настоящему Договору действительны, если они сделаны в письменном виде и подписаны уполномоченными представителями каждой из Сторон.`,
                    `Early termination of the Agreement, any changes, additions and annexes to this Agreement are valid if they are made in writing and signed by authorized representatives of each of the Parties.`,
                  ),
                  newTableRowFourCol(
                    `10.4.`,
                    `Применимым правом для настоящего Договора является право Российской Федерации.`,
                    `The applicable law for this Agreement is the law of the Russian Federation.`,
                  ),
                  newTableRowFourCol(
                    `10.5.`,
                    `Настоящий Договор составлен и подписан в вышеуказанную дату в двух экземплярах, имеющих равную силу.`,
                    `The present Agreement is signed on the date aforesaid, in two bilingual originals.`,
                  ),
                ],
              }),
              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow(``, ``),
                  newTableRow(`РЕКВИЗИТЫ:`, `BANKING INFORMATION`, true),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `ЗАКАЗЧИК`,
                                underline: {},
                                bold: true,
                              }),
                            ],
                          }),
                          emptyLine(),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Наименование: ${data.key.contractCounterpartyName}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Адрес: ${data.key.contractCounterpartyAddress}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `ИНН: ${data.key.contractCounterpartyTIN}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `КПП: ${data.key.contractCounterpartyKPP}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Расчётный счет: ${data.key.contractCounterpartyBankAccount}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Банк: ${data.key.contractCounterpartyBank}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Корреспондентский счет: ${data.key.contractCounterpartyCoreAccount}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `БИК: ${data.key.contractCounterpartyBIK}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `ОКПО: ${data.key.contractCounterpartyOKPO}`,
                              }),
                            ],
                          }),
                          emptyLine(),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `АУДИТОР`,
                                underline: {},
                                bold: true,
                              }),
                            ],
                          }),
                          emptyLine(),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Наименование: АО "Бетерра"`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Адрес: 125167, город Москва, Ленинградский пр-кт, д. 47 стр. 3`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `ИНН: 7704154440`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `КПП: 771401001`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Расчётный счет:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Банк:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Корреспондентский счет:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `БИК:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `ОКПО:`,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `CLIENT`,
                                underline: {},
                                bold: true,
                              }),
                            ],
                          }),
                          emptyLine(),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Name: ${data.key.contractCounterpartyNameEng}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Address: ${data.key.contractCounterpartyAddressEng}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `TIN: ${data.key.contractCounterpartyTIN}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `RRC: ${data.key.contractCounterpartyKPP}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Current account: ${data.key.contractCounterpartyBankAccount}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Bank: ${data.key.contractCounterpartyBankEng}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Correspondent account: ${data.key.contractCounterpartyCoreAccount}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `BIC: ${data.key.contractCounterpartyBIK}`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `All-Russian CEO: ${data.key.contractCounterpartyOKPO}`,
                              }),
                            ],
                          }),
                          emptyLine(),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `AUDITOR`,
                                underline: {},
                                bold: true,
                              }),
                            ],
                          }),
                          emptyLine(),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Name: JSC Beterra`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Address: 125167, Moscow, Leningradsky Prospekt, 47, building 3`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `TIN: 7704154440`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `RRC: 771401001`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Current account:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Bank:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Correspondent account:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `BIC:`,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `All-Russian CEO:`,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newTableRow(`ПОДПИСАНО:`, `SIGNATRURES:`, true),
                  newTableRow(`ОТ ЗАКАЗЧИКА / FROM THE CLIENT`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                  newTableRow(`ОТ АУДИТОРА / FROM THE AUDITOR`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Приложение № 1`,
                              }),
                              new TextRun({
                                text: `к Договору оказания аудиторских услуг №${data.key.contractNumber} от ${data.key.contractDate}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Annex 1`,
                              }),
                              new TextRun({
                                text: `To the Auditing Service Agreement No.${data.key.contractNumber} as of ${data.key.contractDateEng}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newTableRow(
                    `СРОКИ ОКАЗАНИЯ УСЛУГ`,
                    `TIMING OF SERVICES`,
                    true,
                  ),
                  newTableRow(
                    `1.1. Срок окончания Аудитором услуг в соответствии с пунктом 1.1. настоящего Договора, составляет${
                      data.deadlines.contractStage === "no"
                        ? ` ${data.deadlines.contractEndDate}, если иное не будет согласовано сторонами.`
                        : `:`
                    }`,
                    `1.1. The term of termination by the Service Auditor in accordance with clause 1.1. of this Agreement is${
                      data.deadlines.contractStage === "no"
                        ? ` ${data.deadlines.contractEndDateEng}, unless otherwise agreed by the Parties.`
                        : `:`
                    }`,
                  ),
                  newTableRow(
                    data.deadlines.contractStage === "yes"
                      ? `По предварительному этапу проверки – ${data.deadlines.contractEndDatePre}. По финальному этапу проверки – ${data.deadlines.contractEndDate}, если иное не будет согласовано Сторонами.`
                      : ``,
                    data.deadlines.contractStage === "yes"
                      ? `On the preliminary stage of verification - ${data.deadlines.contractEndDatePreEng}. At the final stage of the audit - ${data.deadlines.contractEndDateEng}, unless otherwise agreed by the Parties.`
                      : ``,
                  ),
                  newTableRow(
                    `Аудиторское Заключение по бухгалтерской (финансовой) отчетности будет представлено не позднее ${data.deadlines.contractReportDate}, если иное не будет согласовано Сторонами. `,
                    `The Auditor’s Report on the financial statements will be submitted no later than ${data.deadlines.contractReportDateEng}, unless otherwise agreed by the Parties.`,
                  ),
                  newTableRow(
                    `Аудитор согласен на оказание услуг в указанные сроки при условии, что информация согласно Перечню запрашиваемой информации ${
                      data.deadlines.contractStage === "no"
                        ? `будет предоставлена не позднее ${data.deadlines.contractGetRequestDate}.`
                        : `для предварительного этапа проверки будет предоставлена не позднее ${data.deadlines.contractGetRequestDatePre}, информация согласно финальному Перечню запрашиваемой информации - не позднее ${data.deadlines.contractGetRequestDate}.`
                    }`,
                    `The auditor agrees to provide services on the specified dates, provided that the information in accordance with the List of requested information ${
                      data.deadlines.contractStage === "no"
                        ? `will be provided no later than ${data.deadlines.contractGetRequestDateEng}.`
                        : `for the preliminary verification phase will be provided no later than ${data.deadlines.contractGetRequestDatePreEng}, information according to the final List of requested information - no later than ${data.deadlines.contractGetRequestDateEng}.`
                    }`,
                  ),
                  newTableRow(
                    `В противном случае, срок предоставления Аудитором отчетов по результатам финального аудита будет скорректирован.`,
                    `In other case, the Auditor will adjust the terms of submitting the Auditor’s Reports with respect to the final audit.`,
                  ),
                  newTableRow(
                    `1.2. Перечни запрашиваемой информации и документов будут направлены Аудитором Заказчику не позднее ${
                      data.deadlines.contractStage === "no"
                        ? `${data.deadlines.contractRequestDate}.`
                        : ` ${data.deadlines.contractRequestDatePre} по предварительному этапу проверки и не позднее ${data.deadlines.contractRequestDate} по финальному этапу проверки.`
                    } В противном случае, срок предоставления Заказчиком запрашиваемой информации будет скорректирован.`,
                    `1.2. The lists of the requested information and documents will be sent by the Auditor to the Client no later than ${
                      data.deadlines.contractStage === "no"
                        ? `${data.deadlines.contractRequestDateEng}.`
                        : ` ${data.deadlines.contractRequestDatePreEng} for the preliminary verification stage and no later than ${data.deadlines.contractRequestDateEng} for the final stage of the audit.`
                    } Otherwise, the deadline for the Client to provide the requested information will be adjusted.`,
                  ),
                  newTableRow(
                    `Возможные дополнительные запросы будут направляться Аудитором Заказчику заранее, с учетом необходимого времени для сбора и обработки информации Заказчиком. `,
                    `Possible additional inquiries will be sent by the Auditor to the Client in advance, taking into account the necessary time for collection and processing of information by the Client.`,
                  ),
                  newTableRow(
                    `Предварительно Заказчик обязуется предоставлять запрашиваемую Аудитором информацию и документы по дополнительным запросам Аудитора в течение 2 рабочих дней с момента получения Заказчиком письменного запроса, если подготовка Заказчиком информации и документов не потребует дополнительного времени.`,
                    `Previously the Client undertakes to provide the information and documents requested by the Auditor on additional requests of the Auditor within 2 working days from the moment of receipt by the Client of a written request, if the preparation by the Client of information and documents does not require additional time.`,
                  ),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`ПОДПИСАНО:`, `SIGNATRURES:`, true),
                  newTableRow(`ОТ ЗАКАЗЧИКА / FROM THE CLIENT`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                  newTableRow(`ОТ АУДИТОРА / FROM THE AUDITOR`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Приложение № 2`,
                              }),
                              new TextRun({
                                text: `к Договору оказания аудиторских услуг №${data.key.contractNumber} от ${data.key.contractDate}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Annex 2`,
                              }),
                              new TextRun({
                                text: `To the Auditing Service Agreement No.${data.key.contractNumber} as of ${data.key.contractDateEng}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newTableRow(
                    `ПОРЯДОК ОПЛАТЫ УСЛУГ`,
                    `PAYMENT  FOR SERVICES`,
                    true,
                  ),
                  newTableRow(
                    `Заказчик осуществляет оплату услуг Аудитора в соответствии со следующим графиком:`,
                    `The Client shall pay to the Auditor in accordance with the following schedule:`,
                  ),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [...generatePaymentParagraphs(data.payment)],
                      }),
                      new TableCell({
                        children: [
                          ...generatePaymentParagraphsEng(data.payment),
                        ],
                      }),
                    ],
                  }),
                  newTableRow(
                    `Аудитор в течение 3 (трех) рабочих дней с даты окончания предоставления услуг направляет Заказчику скан Акта выполненных работ, подписанный со своей стороны, на электронную почту ${data.payment.contractEmail}. Оригинал Акта выполненных работ, подписанный со своей стороны, в 2 (двух) экземплярах либо направленный с использованием систем электронного документооборота в соответствии с пунктом 3.5. настоящего Договора. Аудитор направляет Заказчику в течение 5 (пяти) рабочих дней с даты окончания предоставления услуг.`,
                    `The Auditor within 3 (three) working days from the date of completion of the services shall send to the Client a scan of the signed Act of rendering services by e-mail ${data.payment.contractEmail}. The Auditor shall send the original signed Act of rendering services in 2 (two) copies or directed using electronic document management systems in accordance with clause 3.5. of this Agreement. The Auditor shall send to the Client within 5 (five) business days from the date of completion the services.`,
                  ),
                  newTableRow(
                    `Заказчик обязан подписать Акт выполненных работ и вернуть его Аудитору в течение 5 (пяти) рабочих дней со дня получения Акта либо предоставить мотивированный отказ от подписания.`,
                    `The Client is obliged to sign the Act of rendering services and return it to the Auditor within 5 (five) business days from the date of receipt of the Act or provide a reasoned refusal to sign.`,
                  ),
                  newTableRow(
                    `В случае непредставления Аудитору подписанного со стороны Заказчика Акта или мотивированного отказа от его подписания в течение 5 (пяти) рабочих дней с момента получения его Заказчиком, услуги считаются принятыми Заказчиком.`,
                    `In the event that the Client does not return one copy of signed Act of rendering services or  does not provide a motivated refusal to sign the Act to the Auditor within five (5) business days, the Auditor's Services are deemed to be accepted.`,
                  ),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`ПОДПИСАНО:`, `SIGNATRURES:`, true),
                  newTableRow(`ОТ ЗАКАЗЧИКА / FROM THE CLIENT`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                  newTableRow(`ОТ АУДИТОРА / FROM THE AUDITOR`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                ],
              }),

              new Paragraph({
                children: [new PageBreak()],
              }),

              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          right: 250,
                        },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Приложение № 3`,
                              }),
                              new TextRun({
                                text: `к Договору оказания аудиторских услуг №${data.key.contractNumber} от ${data.key.contractDate}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: `Annex 3`,
                              }),
                              new TextRun({
                                text: `To the Auditing Service Agreement No.${data.key.contractNumber} as of ${data.key.contractDateEng}`,
                                break: 1,
                              }),
                            ],
                          }),
                          emptyLine(),
                        ],
                      }),
                    ],
                  }),
                  newTableRow(
                    `ПОЧАСОВЫЕ СТАВКИ СПЕЦИЛИСТОВ АУДИТОРА ПО ДОЛЖНОСТНЫМ УРОВНЯМ (без учета НДС)`,
                    `HONORABLE RATES OF THE AUDITOR SPECIALISTS AT THE OFFICIAL LEVEL (excluding VAT)`,
                    true,
                  ),
                ],
              }),
              new Table({
                columnWidths: [3050, 1450, 3050, 1450],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  generateRatesEng(``, `Рублей в час`, ``, `Rubles per hour`),
                  generateRatesEng(`Партнер`, `20 000`, `Partner`, `20 000`),
                  generateRatesEng(`Директор	`, `20 000`, `Director`, `20 000`),
                  generateRatesEng(
                    `Старший менеджер	`,
                    `15 000`,
                    `Senior Manager`,
                    `15 000`,
                  ),
                  generateRatesEng(`Менеджер`, `12 500`, `Manager`, `12 500`),
                  generateRatesEng(
                    `Ведущий аудитор`,
                    `9 000`,
                    `Supervising seniors`,
                    `9 000`,
                  ),
                  generateRatesEng(
                    `Старший аудитор`,
                    `7 500`,
                    `Seniors`,
                    `7 500`,
                  ),
                  generateRatesEng(
                    `Аудитор`,
                    `5 000`,
                    `Semi- Seniors`,
                    `5 000`,
                  ),
                  generateRatesEng(
                    `Опытный ассистент аудитора`,
                    `4 000`,
                    `Experienced staff assistant`,
                    `4 000`,
                  ),
                  generateRatesEng(
                    `Ассистент аудитора`,
                    `2 500`,
                    `Staff assistant`,
                    `2 500`,
                  ),
                ],
              }),
              new Table({
                columnWidths: [4500, 4500],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`ПОДПИСАНО:`, `SIGNATRURES:`, true),
                  newTableRow(`ОТ ЗАКАЗЧИКА / FROM THE CLIENT`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                  newTableRow(`ОТ АУДИТОРА / FROM THE AUDITOR`, ``, true),
                  newTableRow(``, ``),
                  newTableRow(``, ``),
                  newTableRow(`_____________________`, ``, true),
                ],
              }),
            ],
          },
        ],
      });

  const blob = await Packer.toBlob(doc);
  window.saveAs(blob, `Договор_№${data.key.contractNumber}.docx`);
  console.log("Договор создан!");
}
