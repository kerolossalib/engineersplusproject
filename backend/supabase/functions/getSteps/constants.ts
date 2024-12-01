export const rulesInItaly = `
      Given that: 
      Foreign EU Citizen: What is needed to work in Italy?
      A foreign citizen belonging to an EU State who enters Italy to work must have:
      A valid identity card for expatriation or a passport, both of which are valid;
      A tax code, which can be requested at the competent offices of the Revenue Agency upon presentation of the identification document.
      Furthermore, if the EU foreign citizen intends to stay in our country for more than 3 months, they must apply for residency in Italy. They can then start working as an employee or self-employed, by opening their own VAT number.
      Non-EU Citizen: What is needed to work in Italy?
      The entry and access to work for a non-EU citizen in our country is regulated by the Consolidated Immigration Act and its Implementing Regulations.
      In particular, to enter Italy, the non-EU citizen must have a valid passport (or another equivalent document) and an entry visa (specifically an entry visa for work), which must be requested at the Italian Embassy or Consulates in the country of origin or stable residence of the foreign non-EU citizen.
      Entry into Italy is allowed with short-stay visas, valid for up to 3 months, and long-stay visas that involve the issuance of a long-term residence permit with the same purpose as the visa. For stays of less than 3 months, visas issued by diplomatic authorities of other States with which Italy has ratified agreements, or based on EU regulations, are considered valid.
      To be able to work in Italy, the non-EU foreign citizen must hold a residence permit for work reasons, which must be requested within 8 working days of their entry into the Italian territory. The application must be submitted to the Police Headquarters of the Province where they intend to reside.
      The residence permit for work reasons can be of various types, namely for:
      Subordinate work, Seasonal work, Multi-year seasonal work or Self-employed work

      Access to the labor market for the non-EU citizen: How does it happen?

      A non-EU foreign citizen can access the Italian labor market:

      Directly in Italy, if they are already on the territory of our country and have a regular residence permit that allows them to work and possess the requirements prescribed by law. In this case, the employer must fill out a single model of communication for hiring the non-EU worker in electronic format, using the compulsory communication submission system.

      From abroad, within the annual quotas established by the flow decree. The Italian or foreign employer regularly residing in Italy must submit the request for the hiring of the non-EU worker (request for a work permit) to the Single Desk for Immigration (SUI) of the Province of residence or where the legal or work performance headquarters is located. This application can only be submitted after the publication in the Official Gazette of the annual flow planning decree. To request the work permit, one must follow the procedures indicated in specific joint circulars between the Ministry of Labor and Social Policies and the Ministry of the Interior, which are published in advance of the deadline for submitting applications. Moreover, before submitting the request, the employer must verify that no Italian, EU, or non-EU worker registered in the placement lists or identified as unemployed is available to accept that particular job. If the application is accepted, the employer is summoned to sign the residence contract and for the issuance of the work permit. Subsequently, they must inform the worker, who must go to the diplomatic/consular representation to obtain the entry visa for Italy. Within 8 days of arrival in our country, the worker must go to the Prefecture, also to the Single Desk, to sign the residence contract, collect the tax code, and apply for a residence permit. The work permit is valid for 180 days from issuance. If it is not used, it must be returned to the SUI, attaching an informational note certifying the reason. The work permit is revoked if returned while still valid. In the case of a negative opinion on the issuance of the work permit, the employer receives a notice of rejection of the application with reasoning.

      From abroad, outside the quotas established by the flow decree, and in relation to certain particular cases of entry. This type of access to the Italian labor market applies to highly qualified non-EU workers such as university professors, nurses, entertainers, and managers, who can enter Italian territory throughout the year regardless of what is established by the flow decree. Moreover, for these entries, there is no numerical limit except for those for training internships and professional training, professional/amateur sports, and volunteering, for which a specific contingent is determined.
    `;

// Define the prompt for the Llama 3.1 model
export const responseStructure = `
      For each step list the necessary documents. Think step by step:
        1. Based on the documents the stranger had uploaded
        2. The nationalities of the stranger
        3. Consider the total duration of each step so the stranger is ready to work
        4. Provide a steps list with title, short description, long description, responsible, and duration for each step

        Create a list of all the necessary steps both the applicant and the provider has to do, before the applicant arrives in Italy.

        It is important that you return a response in JSON format with the following fields:
        JSON format:
        {{
            "target": "which type of applicant is these steps for",
            "description": "description of the procedure",
            "stepsList": [
                {{
                    "title": "Step n: Title of the step",
                    "shortDescription": "Short phrase to describe the step",
                    "longDescription": "description of the step",
                    "responsable": "Who will make the step? The stranger or the company",
                    "duration": "The duration of the step",
                    "docs": [
                        {{
                            "name": "The name of the document",
                            "description": "The description of the document",
                            "responsable": "The responsible of the document, applicant or Italian employer",
                        }}
                    ]
                }}
            ]
        }}

        Keep descriptions brief but informative. Focus on the essence of each step.
    `;

// Define the prompt for the Llama 3.1 model
export const responseExample = `
      Here is an example:
      {
          "target": "Non-EU Citizens",
          "description": "Steps for non-EU citizens to apply for the flow decree (decreto flussi) to work in Italy",
          "stepsList": [
              {
                  "title": "Step 1: Obtain Necessary Documentation",
                  "shortDescription": "Gather all required documentation for the application.",
                  "longDescription": "As a non-EU worker, you need to have a valid passport, entry visa for work (requested at the Italian Embassy or Consulate in your home country), and other relevant documents such as proof of employment or an invitation from the employer in Italy.",
                  "responsable": "Applicant and Italian Employer",
                  "duration": "1-2 weeks",
                  "docs": [
                      {
                          "name": "Valid Passport",
                          "description": "A valid passport or an equivalent travel document recognized by Italian authorities.",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Proof of Employment",
                          "description": "A letter or contract from the Italian employer outlining the terms of employment.",
                          "responsable": "Italian Employer"
                      },
                      {
                          "name": "Entry Visa Application Form",
                          "description": "A completed visa application form, which can be obtained from the Italian consulate or embassy.",
                          "responsable": "Applicant"
                      }
                  ]
              },
              ...
              {
                  "title": "Step 4: Obtain Entry Visa",
                  "shortDescription": "Apply for and obtain the entry visa for Italy.",
                  "longDescription": "The applicant must visit the Italian consulate with the work permit to obtain the entry visa. This visa allows the applicant to enter Italy for employment purposes. Ensure all documents are correctly presented and fees are paid.",
                  "responsable": "Applicant",
                  "duration": "1 week",
                  "docs": [
                      {
                          "name": "Valid Passport",
                          "description": "A valid passport or an equivalent travel document recognized by Italian authorities.",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Work Permit (Nulla Osta)",
                          "description": "A work permit (nulla osta) issued by the Italian authorities, which allows the applicant to work in Italy.",
                          "responsable": "Italian Employer"
                      },
                      {
                          "name": "Visa Application Form",
                          "description": "A completed visa application form, which can be obtained from the Italian consulate or embassy.",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Passport-Sized Photographs",
                          "description": "Recent passport-sized photographs that meet the Italian visa requirements.",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Proof of Employment",
                          "description": "A letter or contract from the Italian employer outlining the terms of employment.",
                          "responsable": "Italian Employer"
                      },
                      {
                          "name": "Proof of Accommodation",
                          "description": "Documentation showing where the applicant will reside in Italy (e.g., rental agreement or hotel reservation).",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Health Insurance",
                          "description": "Proof of health insurance coverage for the duration of the applicant's stay in Italy.",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Financial Means",
                          "description": "Proof of sufficient financial means to support the applicant's stay in Italy.",
                          "responsable": "Applicant"
                      },
                      {
                          "name": "Receipt of Visa Fee Payment",
                          "description": "A receipt showing that the visa fee has been paid.",
                          "responsable": "Applicant"
                      }
                  ]
              }
          ]
      }
    `;
