{
  "nodes": [
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [
        300,
        220
      ],
      "id": "a9598777-1a1f-46ad-9393-99b6ff078938",
      "name": "Simple Memory"
    },
    {
      "parameters": {
        "options": {
          "systemMessage": "=You are \"Agent 1: Distill,\" a specialized AI agent in an automated knowledge graph creation pipeline. Your mission is to decompose complex, human-written sentences into a list of simple, unambiguous, and self-contained atomic facts, AND to perform a preliminary semantic analysis by categorizing the components of each fact according to Basic Formal Ontology (BFO).\n\n**BFO CONTEXT: CORE CONCEPTS**\n\nYou MUST use the following BFO categories for your analysis:\n\n*   **Material Entity:** A physical object (a system, a component, equipment).\n*   **Information Content Entity:** The abstract information or knowledge itself (a DID, a requirement, a specification, data).\n*   **Process:** Something that happens over time, an event, or a procedure (an acquisition, a test, a review, a delivery).\n*   **Quality:** An inherent property or characteristic of something (the weight, the color, the state of being 'shielded').\n*   **Role:** A role an entity plays in a particular context (the role of being an 'input', a 'participant').\n*   **Function:** What an object is designed to do (the function 'to pump').\n*   **Other/Unknown:** Use if no other category fits.\n\n**Your Instructions:**\n\n1.  **Decompose:** Break the input sentence into its core, atomic factual claims.\n2.  **Expand Lists:** If a modifier applies to a list of items (e.g., \"military systems, equipment, and components\"), distribute the modifier to create a separate fact for each item.\n3.  **Resolve Pronouns:** Replace pronouns (\"it\", \"they\") with the specific entity they refer to.\n4.  **Semantic Analysis:** For each atomic fact, identify the primary \"subject\" and \"object\" of the statement.\n5.  **Categorize:** Assign the most appropriate BFO category from the list above to both the subject and the object.\n6.  **Output Format:** Your final output MUST be a single, valid JSON object containing a single key \"distilled_facts\". The value must be an array, where each element is a JSON object representing a single atomic fact with the following keys: \"id\", \"fact_text\", \"subject_category\", and \"object_category\".\n\n**Examples:**\n\n---\n**Input:** \"This DID is applicable to acquisitions of military systems, equipment, and components.\"\n**Output:**\n{\n  \"distilled_facts\": [\n    {\n      \"id\": 1,\n      \"fact_text\": \"The specific DID document is an input for the process of acquiring military systems.\",\n      \"subject_category\": \"Information Content Entity\",\n      \"object_category\": \"Process\"\n    },\n    {\n      \"id\": 2,\n      \"fact_text\": \"The specific DID document is an input for the process of acquiring military equipment.\",\n      \"subject_category\": \"Information Content Entity\",\n      \"object_category\": \"Process\"\n    },\n    {\n      \"id\": 3,\n      \"fact_text\": \"The specific DID document is an input for the process of acquiring military components.\",\n      \"subject_category\": \"Information Content Entity\",\n      \"object_category\": \"Process\"\n    }\n  ]\n}\n---\n**Input:** \"The guidance computer's power supply must be shielded.\"\n**Output:**\n{\n  \"distilled_facts\": [\n    {\n      \"id\": 1,\n      \"fact_text\": \"The power supply of the guidance computer is required to have the quality of being shielded.\",\n      \"subject_category\": \"Material Entity\",\n      \"object_category\": \"Quality\"\n    }\n  ]\n}\n"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "position": [
        220,
        0
      ],
      "id": "e5994633-4f0c-425e-8f40-5b8541382a63",
      "name": "Agent1 Distill"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOllama",
      "typeVersion": 1,
      "position": [
        140,
        240
      ],
      "id": "afd78e14-ffb0-4919-946d-4f46f555a45a",
      "name": "Ollama Chat Model",
      "credentials": {
        "ollamaApi": {
          "id": "xHuYe0MDGOs9IpBW",
          "name": "Local Ollama service"
        }
      }
    },
    {
      "parameters": {},
      "id": "6471f694-a0d0-4df3-a1e8-d4dbeb4ae65f",
      "name": "When clicking \"Execute Workflow\"",
      "type": "n8n-nodes-base.manualTrigger",
      "position": [
        -480,
        640
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## 1. Setup: Fetch file from Google Drive, split it into chunks and insert into a vector database\nNote that running this part multiple times will insert multiple copies into your DB",
        "height": 728.4168721167887,
        "width": 1086.039382705461,
        "color": 7
      },
      "id": "55b73295-a904-4516-8b4c-fd318337901c",
      "name": "Sticky Note",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -320,
        460
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "# Try me out\n1. In Pinecone, create an index with 1536 dimensions and select it in the two vector store nodes\n2. Populate Pinecone by clicking the 'test workflow' button below\n3. Click the 'chat' button below and enter the following:\n\n_Which email provider does the creator of Bitcoin use?_",
        "height": 350.7942096493649
      },
      "id": "8d6736ea-e5fc-456e-a43e-329982c85e6f",
      "name": "Sticky Note2",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -780,
        540
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## 2. Chat with file, getting citations in reponse",
        "height": 529,
        "width": 1594,
        "color": 7
      },
      "id": "0c0553cd-e2dd-4b62-a004-71279f9a9562",
      "name": "Sticky Note1",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -320,
        1260
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "Will fetch the Bitcoin whitepaper, but you can change this",
        "height": 257.75985739596473,
        "width": 179.58883583572606,
        "color": 7
      },
      "id": "81a56e1f-74b6-4cd2-8b5b-e5664ba5a474",
      "name": "Sticky Note4",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -300,
        560
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "mode": "insert",
        "pineconeIndex": {
          "__rl": true,
          "mode": "id",
          "value": "test-index"
        },
        "options": {}
      },
      "id": "65a82d4d-1d61-4234-8793-9243c2a47a57",
      "name": "Pinecone Vector Store",
      "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
      "position": [
        260,
        640
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "dc7a70e3-9b04-404b-8892-ba0fcc4274c2",
              "name": "file_url",
              "type": "string",
              "value": " https://drive.google.com/file/d/11Koq9q53nkk0F5Y8eZgaWJUVR03I4-MM/view"
            }
          ]
        },
        "options": {}
      },
      "id": "e760cbd6-6da6-4397-8a51-7a744eb877e7",
      "name": "Set file URL in Google Drive",
      "type": "n8n-nodes-base.set",
      "position": [
        -260,
        640
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "operation": "download",
        "fileId": {
          "__rl": true,
          "mode": "url",
          "value": "={{ $json.file_url }}"
        },
        "options": {}
      },
      "id": "fc595c49-4995-47c9-bbb6-ea131692ea15",
      "name": "Download file",
      "type": "n8n-nodes-base.googleDrive",
      "position": [
        -40,
        640
      ],
      "typeVersion": 3
    },
    {
      "parameters": {
        "dataType": "binary",
        "options": {
          "metadata": {
            "metadataValues": [
              {
                "name": "file_url",
                "value": "={{ $('Set file URL in Google Drive').first().json.file_url }}"
              },
              {
                "name": "file_name",
                "value": "={{ $('Download file').first().binary.data.fileName }}"
              }
            ]
          }
        }
      },
      "id": "09e6c3ab-cdb1-4a23-9080-70dcc1840dad",
      "name": "Default Data Loader",
      "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
      "position": [
        360,
        840
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "chunkSize": 3000,
        "chunkOverlap": 200,
        "options": {}
      },
      "id": "747d1f22-4b77-47ef-bd23-ad2793758d26",
      "name": "Recursive Character Text Splitter",
      "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
      "position": [
        360,
        1020
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "33f4addf-72f3-4618-a6ba-5b762257d723",
              "name": "chunks",
              "type": "number",
              "value": 4
            }
          ]
        },
        "includeOtherFields": true,
        "options": {}
      },
      "id": "5ff763cf-c9bd-409f-9b52-8021a550c523",
      "name": "Set max chunks to send to model",
      "type": "n8n-nodes-base.set",
      "position": [
        -240,
        1380
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "mode": "load",
        "pineconeIndex": {
          "__rl": true,
          "mode": "id",
          "value": "test-index"
        },
        "prompt": "={{ $json.chatInput }}",
        "topK": "={{ $json.chunks }}",
        "options": {}
      },
      "id": "94a0f909-88b6-44ac-b7e2-83ce32ed0e48",
      "name": "Get top chunks matching query",
      "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
      "position": [
        -40,
        1380
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "jsCode": "let out = \"\"\nfor (const i in $input.all()) {\n  let itemText = \"--- CHUNK \" + i + \" ---\\n\"\n  itemText += $input.all()[i].json.document.pageContent + \"\\n\"\n  itemText += \"\\n\"\n  out += itemText\n}\n\nreturn {\n  'context': out\n};"
      },
      "id": "c4f594dc-bedd-4a30-b46b-06c6692180e2",
      "name": "Prepare chunks",
      "type": "n8n-nodes-base.code",
      "position": [
        320,
        1380
      ],
      "typeVersion": 2
    },
    {
      "parameters": {
        "text": "={{ $json.context }}\n\nQuestion: {{ $('When chat message received').first().json.chatInput }}\nHelpful Answer:",
        "schemaType": "manual",
        "inputSchema": "{\n  \"type\": \"object\",\n  \"required\": [\"answer\", \"citations\"],\n  \"properties\": {\n    \"answer\": {\n      \"type\": \"string\"\n    },\n    \"citations\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"number\"\n      }\n    }\n  }\n}",
        "options": {
          "systemPromptTemplate": "=Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Important: In your response, also include the the indexes of the chunks you used to generate the answer."
        }
      },
      "id": "2b04b403-93cc-456a-ae66-67d7726d49d9",
      "name": "Answer the query based on chunks",
      "type": "@n8n/n8n-nodes-langchain.informationExtractor",
      "position": [
        520,
        1380
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "ace6185e-8b3d-4f89-ae36-dfe0c391a0a9",
              "name": "citations",
              "type": "array",
              "value": "={{ $json.citations.map(i => '[' + $('Get top chunks matching query').all()[$json.citations].json.document.metadata.file_name + ', lines ' + $('Get top chunks matching query').all()[$json.citations].json.document.metadata['loc.lines.from'] + '-' + $('Get top chunks matching query').all()[$json.citations].json.document.metadata['loc.lines.to'] + ']') }}"
            }
          ]
        },
        "options": {}
      },
      "id": "7336016a-a116-4847-84b3-c4e9b46b3f05",
      "name": "Compose citations",
      "type": "n8n-nodes-base.set",
      "position": [
        880,
        1380
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "11396286-0378-4c3a-86e1-c9ef51afbfc7",
              "name": "text",
              "type": "string",
              "value": "={{ $json.answer }} {{ $if(!$json.citations.isEmpty(), \"\\n\" + $json.citations.join(\"\"), '') }}"
            }
          ]
        },
        "options": {}
      },
      "id": "81b418f8-d12a-450e-9a55-6cddf10e9964",
      "name": "Generate response",
      "type": "n8n-nodes-base.set",
      "position": [
        1080,
        1380
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.embeddingsOllama",
      "typeVersion": 1,
      "position": [
        200,
        900
      ],
      "id": "29803f7e-b184-43b3-944f-d4d87aaec15b",
      "name": "Embeddings Ollama",
      "credentials": {
        "ollamaApi": {
          "id": "xHuYe0MDGOs9IpBW",
          "name": "Local Ollama service"
        }
      }
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.embeddingsOllama",
      "typeVersion": 1,
      "position": [
        -80,
        1620
      ],
      "id": "bd58203c-c65f-438a-85a3-44c648f3b6a9",
      "name": "Embeddings Ollama1",
      "credentials": {
        "ollamaApi": {
          "id": "xHuYe0MDGOs9IpBW",
          "name": "Local Ollama service"
        }
      }
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOllama",
      "typeVersion": 1,
      "position": [
        460,
        1660
      ],
      "id": "536b9b38-92c8-432e-b700-e1215b4492ff",
      "name": "Ollama Chat Model1",
      "credentials": {
        "ollamaApi": {
          "id": "xHuYe0MDGOs9IpBW",
          "name": "Local Ollama service"
        }
      }
    },
    {
      "parameters": {
        "triggerOn": "folder",
        "options": {}
      },
      "type": "n8n-nodes-base.localFileTrigger",
      "typeVersion": 1,
      "position": [
        -180,
        0
      ],
      "id": "7dda1e0a-f9e5-49a6-8e41-c7fd97a98187",
      "name": "Local File Trigger"
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1.3,
      "position": [
        460,
        220
      ],
      "id": "33c3ef5d-7fab-45fb-b7f4-907d2ccf10ab",
      "name": "Code Tool"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "da64ffde-1e8f-478d-baea-59fc05e6d3ce",
              "name": "data",
              "type": "string",
              "value": "={{ $json.text }}"
            }
          ]
        },
        "options": {}
      },
      "id": "17feab54-2031-4ae0-8a96-0820f55f5f4c",
      "name": "Prep Incoming Doc",
      "type": "n8n-nodes-base.set",
      "position": [
        -1580,
        3120
      ],
      "typeVersion": 3.3
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "df327b01-961c-4a49-8455-58c3fbff111a",
              "name": "project",
              "type": "string",
              "value": "={{ $json.path.split('/').slice(0, 4)[3] }}"
            },
            {
              "id": "6b7d26f9-3a38-417e-85d0-4e9d42476465",
              "name": "path",
              "type": "string",
              "value": "={{ $json.path }}"
            },
            {
              "id": "bb4471c7-d894-4739-99a6-4be247794ffa",
              "name": "filename",
              "type": "string",
              "value": "={{ $json.path.split('/').last() }}"
            }
          ]
        },
        "options": {}
      },
      "id": "ef9266a4-7885-4d72-97b2-e52ca41209bf",
      "name": "Settings",
      "type": "n8n-nodes-base.set",
      "position": [
        -2160,
        2960
      ],
      "typeVersion": 3.3
    },
    {
      "parameters": {
        "mode": "chooseBranch"
      },
      "id": "e6709687-d5db-46fd-acf8-3a19448a140c",
      "name": "Merge",
      "type": "n8n-nodes-base.merge",
      "position": [
        -880,
        3120
      ],
      "typeVersion": 2.1
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "{\n  \"docs\": [\n    {\n      \"filename\": \"study_guide.md\",\n      \"title\": \"Study Guide\",\n      \"description\": \"A Study Guide is a consolidated resource designed to aid learning. This guide includes three key elements: * A short answer quiz accompanied by an answer key to test comprehension. * A curated list of long-form essay questions to encourage deeper analysis and synthesis of the material. * A glossary of key terms to reinforce understanding of important concepts.\"\n    },\n    {\n      \"filename\": \"timeline.md\",\n      \"title\": \"Timeline\",\n      \"description\": \"A Timeline organizes all significant events described in the sources you have uploaded in chronological order. This ordered list makes it easier to understand the sequence of events and their connection to the broader context of your sources. In addition to the list of events, the Timeline also provides a “cast of characters,” which comprises short biographical sketches of all the important people mentioned in your uploaded sources. These short biographies can help you quickly grasp the roles of various individuals involved in the events described by the Timeline.\"\n    },\n    {\n      \"filename\": \"briefing_doc.md\",\n      \"title\": \"Briefing Doc\",\n      \"description\": \"A Briefing Doc identifies and presents the most important facts and insights from the sources in an easy-to-understand outline format. This format is designed to provide a concise overview of the key takeaways from the uploaded materials.\"\n    }\n  ]\n}\n",
        "options": {}
      },
      "id": "44a86eae-fd7b-4f4f-a241-937085ba86cc",
      "name": "Get Doc Types",
      "type": "n8n-nodes-base.set",
      "position": [
        -480,
        3120
      ],
      "executeOnce": true,
      "typeVersion": 3.3
    },
    {
      "parameters": {
        "fieldToSplitOut": "docs",
        "options": {}
      },
      "id": "6b195280-dc96-4409-8a1e-9efeedabf375",
      "name": "Split Out Doc Types",
      "type": "n8n-nodes-base.splitOut",
      "position": [
        -320,
        3120
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "e5bf06f9-a596-4bbe-ba96-73c40d7b1c13",
      "name": "For Each Doc Type...",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [
        -140,
        3120
      ],
      "typeVersion": 3
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "e62a6d58-eb25-4019-9174-e893da147f4b",
      "name": "Item List Output Parser",
      "type": "@n8n/n8n-nodes-langchain.outputParserItemList",
      "position": [
        360,
        3540
      ],
      "typeVersion": 1
    },
    {
      "parameters": {},
      "id": "28699485-7e13-45de-ae67-f70e28ae1feb",
      "name": "Vector Store Retriever",
      "type": "@n8n/n8n-nodes-langchain.retrieverVectorStore",
      "position": [
        720,
        3540
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "qdrantCollection": {
          "__rl": true,
          "mode": "list",
          "value": "storynotes",
          "cachedResultName": "storynotes"
        },
        "options": {}
      },
      "id": "5c3aedb8-edb0-4005-863f-9c3ed67714b9",
      "name": "Qdrant Vector Store1",
      "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
      "position": [
        720,
        3640
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "fieldToSplitOut": "response",
        "options": {}
      },
      "id": "b3c0e054-32f9-4161-9ada-316b88994fb8",
      "name": "Split Out",
      "type": "n8n-nodes-base.splitOut",
      "position": [
        480,
        3380
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "fieldsToAggregate": {
          "fieldToAggregate": [
            {
              "fieldToAggregate": "response.text"
            }
          ]
        },
        "options": {}
      },
      "id": "3ab92b1d-bd50-4feb-8ac8-41bf6dc16f46",
      "name": "Aggregate",
      "type": "n8n-nodes-base.aggregate",
      "position": [
        920,
        3380
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.response }}",
        "options": {}
      },
      "id": "2c07eee7-80b4-4b58-b7e2-3fa1942ddec3",
      "name": "Discover",
      "type": "@n8n/n8n-nodes-langchain.chainRetrievalQa",
      "position": [
        620,
        3380
      ],
      "typeVersion": 1.3
    },
    {
      "parameters": {},
      "id": "e728fc4b-a89f-42e4-b61c-11329ddbac6b",
      "name": "2secs",
      "type": "n8n-nodes-base.wait",
      "position": [
        1400,
        3760
      ],
      "webhookId": "ec58ab18-03c5-4b58-bc2e-24415a236c72",
      "typeVersion": 1.1
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "b38546b2-47c4-4967-a2d7-98aebd589e95",
              "name": "data",
              "type": "string",
              "value": "={{ $json.text }}"
            },
            {
              "id": "a263519a-aa05-410a-b4f0-f5e22cc5058c",
              "name": "path",
              "type": "string",
              "value": "={{ $('Prep For AI').item.json.path }}"
            },
            {
              "id": "ec1687d6-0ea9-460f-b9d4-ae4a7e229e12",
              "name": "filename",
              "type": "string",
              "value": "={{ $('Prep For AI').item.json.name }}"
            }
          ]
        },
        "options": {}
      },
      "id": "3ee027ab-f36a-4204-8de6-49a2407ab93a",
      "name": "Get Generated Documents",
      "type": "n8n-nodes-base.set",
      "position": [
        200,
        2940
      ],
      "typeVersion": 3.3
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=## Document\n{{ $json.text.join('\\n') }}",
        "messages": {
          "messageValues": [
            {
              "message": "=Your job is to create a {{ $('For Each Doc Type...').item.json.title }} for the given document. {{ $('For Each Doc Type...').item.json.description }}\n\nGenerate a  {{ $('For Each Doc Type...').item.json.title }} for the given document. If questions are generated, generate the answers alongside them. Format your response in markdown; use \"#\" to format headings, use \"*\" to format lists."
            }
          ]
        }
      },
      "id": "86624e2c-6acf-4ea4-9f66-6896dba75f5a",
      "name": "Generate",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "position": [
        1060,
        3380
      ],
      "typeVersion": 1.4
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "5c864125-c884-4d33-b0ed-e3eecd354196",
              "name": "id",
              "type": "string",
              "value": "={{ $('Settings').first().json.filename.hash() }}"
            },
            {
              "id": "93ac14c1-ae97-4ef2-a66f-6c1110f3b0fc",
              "name": "project",
              "type": "string",
              "value": "={{ $('Settings').first().json.project }}"
            },
            {
              "id": "fafd16b9-0002-4f7c-89d0-29788f8ec472",
              "name": "path",
              "type": "string",
              "value": "={{ $('Settings').first().json.path }}"
            },
            {
              "id": "5a5860ba-918b-4fb8-b18c-96c1cd22091a",
              "name": "name",
              "type": "string",
              "value": "={{ $('Settings').first().json.filename }}"
            },
            {
              "id": "1a1caf65-85d8-4f74-a3be-503ccfc0b2c9",
              "name": "summary",
              "type": "string",
              "value": "={{ $('Summarization Chain').first().json.response.text }}"
            }
          ]
        },
        "options": {}
      },
      "id": "7a0e573e-9b1f-4ef7-b2b9-29c8813bfe14",
      "name": "Prep For AI",
      "type": "n8n-nodes-base.set",
      "position": [
        -720,
        3120
      ],
      "typeVersion": 3.3
    },
    {
      "parameters": {
        "operation": "toText",
        "sourceProperty": "={{ $json.data }}",
        "options": {}
      },
      "id": "bf8539bb-3331-4018-9aab-34558c17521b",
      "name": "To Binary",
      "type": "n8n-nodes-base.convertToFile",
      "position": [
        380,
        2940
      ],
      "typeVersion": 1.1
    },
    {
      "parameters": {
        "operation": "write",
        "fileName": "={{\n  $('Get Generated Documents').item.json.path.replace(\n    $('Get Generated Documents').item.json.path.split('/').last(),\n    $('Get Generated Documents').item.json.filename.substring(0,21) + '...' + $('Split Out Doc Types').item.json.title + '.md'\n  )\n}}",
        "options": {}
      },
      "id": "0663a427-fbc3-46a9-a636-61fb0184b7c3",
      "name": "Export to Folder",
      "type": "n8n-nodes-base.readWriteFile",
      "position": [
        540,
        2940
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "leftValue": "",
                  "caseSensitive": true,
                  "typeValidation": "strict"
                },
                "combinator": "and",
                "conditions": [
                  {
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "leftValue": "={{ $json.fileType }}",
                    "rightValue": "pdf"
                  }
                ]
              },
              "renameOutput": true,
              "outputKey": "pdf"
            },
            {
              "conditions": {
                "options": {
                  "leftValue": "",
                  "caseSensitive": true,
                  "typeValidation": "strict"
                },
                "combinator": "and",
                "conditions": [
                  {
                    "id": "3a5f509d-46fe-490c-95f0-35124873c63e",
                    "operator": {
                      "name": "filter.operator.equals",
                      "type": "string",
                      "operation": "equals"
                    },
                    "leftValue": "={{ $json.fileType }}",
                    "rightValue": "docx"
                  }
                ]
              },
              "renameOutput": true,
              "outputKey": "docx"
            },
            {
              "conditions": {
                "options": {
                  "leftValue": "",
                  "caseSensitive": true,
                  "typeValidation": "strict"
                },
                "combinator": "and",
                "conditions": [
                  {
                    "id": "75188d2f-4bea-44ea-a579-9b9a1bd1ea93",
                    "operator": {
                      "type": "object",
                      "operation": "exists",
                      "singleValue": true
                    },
                    "leftValue": "={{ $json }}",
                    "rightValue": ""
                  }
                ]
              },
              "renameOutput": true,
              "outputKey": "everything else"
            }
          ]
        },
        "options": {}
      },
      "id": "060e36c4-04fd-45ea-9a98-305b17277c70",
      "name": "Get FileType",
      "type": "n8n-nodes-base.switch",
      "position": [
        -2000,
        3120
      ],
      "typeVersion": 3
    },
    {
      "parameters": {
        "fileSelector": "={{ $json.path }}",
        "options": {}
      },
      "id": "bf8d7a11-1348-44d0-b1a5-94e50ddd20e1",
      "name": "Import File",
      "type": "n8n-nodes-base.readWriteFile",
      "position": [
        -2160,
        3120
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "operation": "pdf",
        "options": {}
      },
      "id": "d9f2d384-8ec6-4d31-a548-4f4aa4d127b0",
      "name": "Extract from PDF",
      "type": "n8n-nodes-base.extractFromFile",
      "position": [
        -1800,
        2960
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "operation": "ods",
        "options": {}
      },
      "id": "f9a42e99-1c17-4ba4-acc9-a72eccf4a7f8",
      "name": "Extract from DOCX",
      "type": "n8n-nodes-base.extractFromFile",
      "position": [
        -1800,
        3120
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "operation": "text",
        "options": {}
      },
      "id": "5d974393-828f-45aa-8681-4cff28ad3001",
      "name": "Extract from TEXT",
      "type": "n8n-nodes-base.extractFromFile",
      "position": [
        -1800,
        3280
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "chunkSize": 4000,
        "options": {}
      },
      "id": "228a732e-c168-4581-9703-965d15d5c3a0",
      "name": "Summarization Chain",
      "type": "@n8n/n8n-nodes-langchain.chainSummarization",
      "position": [
        -1280,
        2960
      ],
      "typeVersion": 2
    },
    {
      "parameters": {
        "content": "## Step 4. Use AI Agents to Query and Generate Template Documents\n[Read more about using the Question & Answer Retrieval Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa)\n\nn8n allows us to easily use a chain of LLMs as agents which can work together to handle any task!\nHere the agents generate questions to explore the content of the source document and use the answers to generate the template. ",
        "height": 806.6560661824452,
        "width": 1500.7886103732135,
        "color": 7
      },
      "id": "3e8e0be5-4cda-4a64-9c2f-7c4b464a0284",
      "name": "Sticky Note3",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        80,
        3180
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "mode": "insert",
        "qdrantCollection": {
          "__rl": true,
          "mode": "list",
          "value": "storynotes",
          "cachedResultName": "storynotes"
        },
        "options": {}
      },
      "id": "693f1e6a-417d-4f2e-b890-bf764edf983d",
      "name": "Qdrant Vector Store",
      "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
      "position": [
        -1280,
        3260
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Try It Out! \n\n### This workflow automates generating notes from a source document.\n* It watches a target folder to pick up new files.\n* When a new file is detected, it saves the contents of the file in a vectorstore.\n* multiple AI agents guided by a templates list, generate the predetermined notes.\n* These notes are then export alongside the original source file for the user.\n\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!",
        "height": 401.0080676370763,
        "width": 390.63004227317265
      },
      "id": "b6ddd695-e546-4433-a7ce-199e21065475",
      "name": "Sticky Note5",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -2840,
        2780
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 💡Add your own templates here!\n",
        "height": 295.46359440513226,
        "width": 172.26820279743384
      },
      "id": "8af65130-2302-4b3e-b180-614eeb46d356",
      "name": "Sticky Note6",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -520,
        3080
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "triggerOn": "folder",
        "path": "/home/node/storynotes/context",
        "events": [
          "add"
        ],
        "options": {
          "followSymlinks": true,
          "usePolling": true
        }
      },
      "id": "9054b4e0-a6bb-4ae7-9577-8fb559b22cb9",
      "name": "Local File Trigger1",
      "type": "n8n-nodes-base.localFileTrigger",
      "position": [
        -2340,
        2960
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "jsonMode": "expressionData",
        "jsonData": "={{ $json.data }}",
        "options": {
          "metadata": {
            "metadataValues": [
              {
                "name": "project",
                "value": "={{ $('Settings').item.json.project }}"
              },
              {
                "name": "filename",
                "value": "={{ $('Settings').item.json.filename }}"
              }
            ]
          }
        }
      },
      "id": "6388cef0-1b56-4f88-9e59-52595eabf990",
      "name": "Default Data Loader1",
      "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
      "position": [
        -1180,
        3420
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "chunkSize": 2000,
        "options": {}
      },
      "id": "c5778f72-c56b-4e67-a182-46984fd07cc7",
      "name": "Recursive Character Text Splitter1",
      "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
      "position": [
        -1180,
        3560
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Step 1. Watch Folder and Import New Documents\n[Read more about Local File Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger)\n\nWith n8n's local file trigger, we're able to trigger the workflow when files are created in our target folder. We still have to import them however as the trigger will only give the file's path. The \"Extract From\" node is used to get at the file's contents.",
        "height": 694.0931000693263,
        "width": 995.1475972814769,
        "color": 7
      },
      "id": "5a9c49fc-eb0c-48eb-b4d3-f3dd085bb906",
      "name": "Sticky Note7",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -2420,
        2780
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Step 2. Summarise and Vectorise Document Contents\n[Learn more about using the Qdrant VectorStore](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant)\n\nCapturing the document into our vector store is intended for a technique we'll use later known as Retrieval Augumented Generation or \"RAG\" for short. For our scenario, this allows our LLM to retrieve context more efficiently which produces better respsonses.",
        "height": 949.8141899605673,
        "width": 824.3300768713589,
        "color": 7
      },
      "id": "a2f8eac7-5814-43c2-97d8-4d66b6aefce3",
      "name": "Sticky Note8",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -1400,
        2780
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Step 3. Loop through Templates\n\nWe'll ask the LLM to help us generate 3 types of notes from the imported source document. These notes are intended to breakdown the content for faster study. Our templates for this demo are:\n(1) **Study guide**\n(2) **Briefing document**\n(3) **Timeline**",
        "height": 485.0226378812345,
        "width": 591.09953935829,
        "color": 7
      },
      "id": "dddf89df-7ecf-4d4f-b19e-c9f1aa651aba",
      "name": "Sticky Note9",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -540,
        2860
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Step 5. Export Generated Templates To Folder\n[Learn more about writing to the local filesystem](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite)\n\nFinally, the AI generated documents can now be exported to disk. This workflow makes it easy to generate any kind of document from various source material and can be used for training and sales.",
        "height": 384.22073222791266,
        "width": 771.8710855215123,
        "color": 7
      },
      "id": "f43e9ca1-b5bc-40f0-bb5d-075605316601",
      "name": "Sticky Note10",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        80,
        2760
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=## document summary\n {{ $('Prep For AI').item.json.summary }}",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "message": "=Given the following document summary, what questions would you ask to create a {{ $('For Each Doc Type...').item.json.title }} for the document? Generate 5 questions."
            }
          ]
        }
      },
      "id": "f512b1c2-9b50-401e-85d1-15af738763fc",
      "name": "Agent1 Distill1",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "position": [
        180,
        3380
      ],
      "typeVersion": 1.4
    },
    {
      "parameters": {
        "model": "open-mixtral-8x7b",
        "options": {}
      },
      "id": "03e5cf14-6c73-4b80-a70d-e36baa3db8d5",
      "name": "Mistral Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatMistralCloud",
      "position": [
        180,
        3540
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "7ebac8a9-7451-4dce-9d48-23f2adfe8655",
      "name": "Mistral Model2",
      "type": "@n8n/n8n-nodes-langchain.lmChatMistralCloud",
      "position": [
        620,
        3540
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "model": "open-mixtral-8x7b",
        "options": {}
      },
      "id": "4096d056-569b-48d8-b31e-88267ba734fa",
      "name": "Mistral Model3",
      "type": "@n8n/n8n-nodes-langchain.lmChatMistralCloud",
      "position": [
        1060,
        3540
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "81db6b94-b6e9-4469-ab77-c199c75617f3",
      "name": "Embeddings Mistral",
      "type": "@n8n/n8n-nodes-langchain.embeddingsMistralCloud",
      "position": [
        720,
        3760
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "model": "open-mixtral-8x7b",
        "options": {}
      },
      "id": "afd32fee-1508-4abd-bc50-7d33d8e5e288",
      "name": "Mistral Model1",
      "type": "@n8n/n8n-nodes-langchain.lmChatMistralCloud",
      "position": [
        -1280,
        3100
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "574c7bf6-b954-44a0-8dbb-fa1a4754f45b",
      "name": "Embeddings Mistral1",
      "type": "@n8n/n8n-nodes-langchain.embeddingsMistralCloud",
      "position": [
        -1300,
        3420
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "69531639-4d6a-49f7-84ef-4e1135cb42a9",
      "name": "Loop Over Items",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [
        860,
        5100
      ],
      "typeVersion": 3
    },
    {
      "parameters": {
        "jsCode": "return $input.first().json.output"
      },
      "id": "f6c9b77f-75f4-4027-a1bf-fb42b3924b22",
      "name": "Code",
      "type": "n8n-nodes-base.code",
      "position": [
        660,
        5100
      ],
      "typeVersion": 2
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=Provide me a blog post for the following title : {{ $json.title }} and description {{ $json.description }}",
        "messages": {
          "messageValues": [
            {
              "message": "You are an expert content generator"
            }
          ]
        },
        "batching": {}
      },
      "id": "b73f36fd-ad80-4b71-9f6a-ee06455b8289",
      "name": "LLM Content Generator",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "position": [
        1340,
        5120
      ],
      "retryOnFail": true,
      "typeVersion": 1.7
    },
    {
      "parameters": {
        "modelName": "models/gemini-2.0-flash-exp",
        "options": {}
      },
      "id": "9b98b5d2-4969-4eb7-a60e-c7a2b9f1d212",
      "name": "Google Gemini Chat Model for Content Generation",
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "position": [
        1440,
        5280
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "[{\n\t\"type\": \"array\",\n\t\"properties\": {\n\t\t\"title\": {\n\t\t\t\"type\": \"string\"\n\t\t},\n\t\t\"description\": {\n\t\t\t\"type\": \"string\"\n\t\t}\n\t}\n}]"
      },
      "id": "d41118f4-12d7-4c31-b6de-cfdd2ad28e53",
      "name": "Structured Output Parser for Content Idea Generator",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "position": [
        460,
        5280
      ],
      "typeVersion": 1.2
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "mode": "list",
          "value": "17ahJiPGh4mbW9VQpQ_3TZCU-VDV-YlkOKFEhoEU1Zgo",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/17ahJiPGh4mbW9VQpQ_3TZCU-VDV-YlkOKFEhoEU1Zgo/edit?usp=drivesdk",
          "cachedResultName": "Content Ideas"
        },
        "sheetName": {
          "__rl": true,
          "mode": "list",
          "value": "gid=0",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/17ahJiPGh4mbW9VQpQ_3TZCU-VDV-YlkOKFEhoEU1Zgo/edit#gid=0",
          "cachedResultName": "Sheet1"
        },
        "columns": {
          "value": {
            "title": "={{ $('Set the title & description').item.json.title }}",
            "content": "={{ $json.text }}",
            "description": "={{ $('Set the title & description').item.json.description }}"
          },
          "schema": [
            {
              "id": "title",
              "type": "string",
              "display": true,
              "removed": false,
              "required": false,
              "displayName": "title",
              "defaultMatch": false,
              "canBeUsedToMatch": true
            },
            {
              "id": "description",
              "type": "string",
              "display": true,
              "required": false,
              "displayName": "description",
              "defaultMatch": false,
              "canBeUsedToMatch": true
            },
            {
              "id": "content",
              "type": "string",
              "display": true,
              "required": false,
              "displayName": "content",
              "defaultMatch": false,
              "canBeUsedToMatch": true
            }
          ],
          "mappingMode": "defineBelow",
          "matchingColumns": [
            "title"
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "147a1597-071d-4745-a4bc-fb59a5ca2783",
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "position": [
        1720,
        5120
      ],
      "typeVersion": 4.6
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "25acf070-f986-4872-bc30-7ea8143c4b70",
              "name": "title",
              "type": "string",
              "value": "={{ $json.title }}"
            },
            {
              "id": "522324ba-b6c3-4650-b447-469edcc08aee",
              "name": "description",
              "type": "string",
              "value": "={{ $json.description }}"
            }
          ]
        },
        "options": {}
      },
      "id": "18095d9a-2d74-4d57-8ac6-9f300375b938",
      "name": "Set the title & description",
      "type": "n8n-nodes-base.set",
      "position": [
        1080,
        5120
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7a1fd824-9256-4a4e-aab6-f86506c0cc91",
              "name": "topic",
              "type": "string",
              "value": "Web scraper"
            }
          ]
        },
        "options": {}
      },
      "id": "cfbddc57-10d8-4317-8478-5aadcd06064a",
      "name": "Set the input fields",
      "type": "n8n-nodes-base.set",
      "position": [
        60,
        5100
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=Generate 5 content ideas related to the following topic: {{ $json.topic }}\n\nOutput the response in the following schema.\n\nJSON Schema\n\n[{\n\t\"type\": \"array\",\n\t\"properties\": {\n\t\t\"title\": {\n\t\t\t\"type\": \"string\"\n\t\t},\n\t\t\"description\": {\n\t\t\t\"type\": \"string\"\n\t\t}\n\t}\n}]",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "message": "You are an expert content generator"
            }
          ]
        },
        "batching": {}
      },
      "id": "dfdfe447-1d26-44ab-b4f0-7a99d8ed6875",
      "name": "Content Idea Generator",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "position": [
        280,
        5100
      ],
      "retryOnFail": true,
      "typeVersion": 1.7
    },
    {
      "parameters": {
        "modelName": "models/gemini-2.0-flash-exp",
        "options": {}
      },
      "id": "1efcfe87-8836-4844-bbb3-0b9e86e20ddf",
      "name": "Google Gemini Chat Model for Content Idea Generator",
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "position": [
        280,
        5280
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Workflow Setup\n\n**Credentials:** Configure your Google AI and Google Sheets credentials in n8n.\n\n**Google Sheets:** Create a new Google Sheet or use an existing one. Note down the Spreadsheet ID (found in the URL)\n\n**Google Sheets Node:** Update the 'Write to Google Sheet' node with your Spreadsheet ID and desired sheet/range\n\nThis workflow generates content ideas using Google AI based on a topic and saves them to your Google Sheet.",
        "height": 280,
        "width": 540
      },
      "id": "f5720653-8573-4ecc-bb07-9e5557af1af5",
      "name": "Sticky Note11",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -160,
        4760
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## Google Sheet\n\nMake sure to have the following column names on your google sheet.\n\n1. title\n2. description\n3. content",
        "height": 280,
        "width": 540,
        "color": 4
      },
      "id": "31eda2ce-d385-4fdf-9f30-2253534c25ee",
      "name": "Sticky Note12",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        440,
        4760
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "content": "## LLM Usages\n\nGoogle Gemini LLM is being utilized for the structured data extraction handling.",
        "height": 240,
        "width": 440,
        "color": 5
      },
      "id": "90138750-a02f-4b86-ad55-d68b4337d9f9",
      "name": "Sticky Note13",
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        1040,
        4760
      ],
      "typeVersion": 1
    }
  ],
  "connections": {
    "Simple Memory": {
      "ai_memory": [
        [
          {
            "node": "Agent1 Distill",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Ollama Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Agent1 Distill",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "When clicking \"Execute Workflow\"": {
      "main": [
        [
          {
            "node": "Set file URL in Google Drive",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set file URL in Google Drive": {
      "main": [
        [
          {
            "node": "Download file",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Download file": {
      "main": [
        [
          {
            "node": "Pinecone Vector Store",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Default Data Loader": {
      "ai_document": [
        [
          {
            "node": "Pinecone Vector Store",
            "type": "ai_document",
            "index": 0
          }
        ]
      ]
    },
    "Recursive Character Text Splitter": {
      "ai_textSplitter": [
        [
          {
            "node": "Default Data Loader",
            "type": "ai_textSplitter",
            "index": 0
          }
        ]
      ]
    },
    "Set max chunks to send to model": {
      "main": [
        [
          {
            "node": "Get top chunks matching query",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get top chunks matching query": {
      "main": [
        [
          {
            "node": "Prepare chunks",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare chunks": {
      "main": [
        [
          {
            "node": "Answer the query based on chunks",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Answer the query based on chunks": {
      "main": [
        [
          {
            "node": "Compose citations",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Compose citations": {
      "main": [
        [
          {
            "node": "Generate response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Embeddings Ollama": {
      "ai_embedding": [
        [
          {
            "node": "Pinecone Vector Store",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Embeddings Ollama1": {
      "ai_embedding": [
        [
          {
            "node": "Get top chunks matching query",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Ollama Chat Model1": {
      "ai_languageModel": [
        [
          {
            "node": "Answer the query based on chunks",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Local File Trigger": {
      "main": [
        [
          {
            "node": "Agent1 Distill",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code Tool": {
      "ai_tool": [
        [
          {
            "node": "Agent1 Distill",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Prep Incoming Doc": {
      "main": [
        [
          {
            "node": "Qdrant Vector Store",
            "type": "main",
            "index": 0
          },
          {
            "node": "Summarization Chain",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Settings": {
      "main": [
        [
          {
            "node": "Import File",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge": {
      "main": [
        [
          {
            "node": "Prep For AI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Doc Types": {
      "main": [
        [
          {
            "node": "Split Out Doc Types",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split Out Doc Types": {
      "main": [
        [
          {
            "node": "For Each Doc Type...",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "For Each Doc Type...": {
      "main": [
        [
          {
            "node": "Get Generated Documents",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Agent1 Distill1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Item List Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "Agent1 Distill1",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Vector Store Retriever": {
      "ai_retriever": [
        [
          {
            "node": "Discover",
            "type": "ai_retriever",
            "index": 0
          }
        ]
      ]
    },
    "Qdrant Vector Store1": {
      "ai_vectorStore": [
        [
          {
            "node": "Vector Store Retriever",
            "type": "ai_vectorStore",
            "index": 0
          }
        ]
      ]
    },
    "Split Out": {
      "main": [
        [
          {
            "node": "Discover",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Aggregate": {
      "main": [
        [
          {
            "node": "Generate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Discover": {
      "main": [
        [
          {
            "node": "Aggregate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "2secs": {
      "main": [
        [
          {
            "node": "For Each Doc Type...",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Generated Documents": {
      "main": [
        [
          {
            "node": "To Binary",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate": {
      "main": [
        [
          {
            "node": "2secs",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prep For AI": {
      "main": [
        [
          {
            "node": "Get Doc Types",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "To Binary": {
      "main": [
        [
          {
            "node": "Export to Folder",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get FileType": {
      "main": [
        [
          {
            "node": "Extract from PDF",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extract from DOCX",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extract from TEXT",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Import File": {
      "main": [
        [
          {
            "node": "Get FileType",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract from PDF": {
      "main": [
        [
          {
            "node": "Prep Incoming Doc",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract from DOCX": {
      "main": [
        [
          {
            "node": "Prep Incoming Doc",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract from TEXT": {
      "main": [
        [
          {
            "node": "Prep Incoming Doc",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Summarization Chain": {
      "main": [
        [
          {
            "node": "Merge",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Qdrant Vector Store": {
      "main": [
        [
          {
            "node": "Merge",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Local File Trigger1": {
      "main": [
        [
          {
            "node": "Settings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Default Data Loader1": {
      "ai_document": [
        [
          {
            "node": "Qdrant Vector Store",
            "type": "ai_document",
            "index": 0
          }
        ]
      ]
    },
    "Recursive Character Text Splitter1": {
      "ai_textSplitter": [
        [
          {
            "node": "Default Data Loader1",
            "type": "ai_textSplitter",
            "index": 0
          }
        ]
      ]
    },
    "Agent1 Distill1": {
      "main": [
        [
          {
            "node": "Split Out",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Mistral Model": {
      "ai_languageModel": [
        [
          {
            "node": "Agent1 Distill1",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Mistral Model2": {
      "ai_languageModel": [
        [
          {
            "node": "Discover",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Mistral Model3": {
      "ai_languageModel": [
        [
          {
            "node": "Generate",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Embeddings Mistral": {
      "ai_embedding": [
        [
          {
            "node": "Qdrant Vector Store1",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Mistral Model1": {
      "ai_languageModel": [
        [
          {
            "node": "Summarization Chain",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Embeddings Mistral1": {
      "ai_embedding": [
        [
          {
            "node": "Qdrant Vector Store",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items": {
      "main": [
        [],
        [
          {
            "node": "Set the title & description",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "LLM Content Generator": {
      "main": [
        [
          {
            "node": "Google Sheets",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model for Content Generation": {
      "ai_languageModel": [
        [
          {
            "node": "LLM Content Generator",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser for Content Idea Generator": {
      "ai_outputParser": [
        [
          {
            "node": "Content Idea Generator",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Google Sheets": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set the title & description": {
      "main": [
        [
          {
            "node": "LLM Content Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set the input fields": {
      "main": [
        [
          {
            "node": "Content Idea Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Content Idea Generator": {
      "main": [
        [
          {
            "node": "Code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model for Content Idea Generator": {
      "ai_languageModel": [
        [
          {
            "node": "Content Idea Generator",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "558d88703fb65b2d0e44613bc35916258b0f0bf983c5d4730c00c424b77ca36a"
  }
}
