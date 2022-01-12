import { convertUtf8ToHex } from "@walletconnect/utils";
import { MsgWriteRecordRequest } from "@provenanceio/wallet-lib/lib/proto/provenance/metadata/v1/tx_pb";
import * as GoogleProtobufAnyPb from 'google-protobuf/google/protobuf/any_pb';

export const writeRecord = async (state, data) => {
  const { connector, address } = state;
  const {
    record,
    signersList,
    sessionIdComponents,
    contractSpecUuid,
    partiesList,
  } = data;
  const method = 'provenance_sendTransaction';
  const description = 'Write Session';
  const protoMessage = 'provenance.marker.v1.MsgWriteRecordRequest';

  if (!connector) return { method, error: 'No wallet connected' };

  const msgWriteRecordRequest = new MsgWriteRecordRequest();
  /*
    ***** wallet-lib MsgWriteRecordRequest *****
    setRecord [object]
      - name [string]
      - sessionId [string]
      - process [object]
        - address [string]
        - hash [string]
        - name [string]
        - method [string]
      - inputsList [array]
      - outputsList [array]
      - specificationId [string]
    setSignersList [array]
    setSessionIdComponents [object]
      - scopeUuid [string]
      - scopeAddr [string]
      - sessionUuid [string]
    setContractSpecUuid [string]
    setPartiesList [array]
      - address [string]
      - role [string]
  */
    msgWriteRecordRequest.setRecord(record);
    msgWriteRecordRequest.setSignersList(signersList);
    msgWriteRecordRequest.setSessionIdComponents(sessionIdComponents);
    msgWriteRecordRequest.setContractSpecUuid(contractSpecUuid);
    msgWriteRecordRequest.setPartiesList(partiesList);

  /* Convert the add marker message to any bytes for signing */
  const msgAny = new GoogleProtobufAnyPb.Any();
  msgAny.pack(msgWriteRecordRequest.serializeBinary(), protoMessage, '/');
  const binary = String.fromCharCode(...msgAny.serializeBinary());
  const message = btoa(binary);

  // encode message (hex)
  const hexMsg = convertUtf8ToHex(message);

  const metadata = JSON.stringify({
    description,
    address,
  });
  // provenance_signTransaction params
  const msgParams = [metadata, hexMsg];
  try {
    // Custom Request
    const customRequest = {
      id: 1,
      jsonrpc: "2.0",
      method,
      params: msgParams,
    };
    // send message
    const result = await connector.sendCustomRequest(customRequest);
    // TODO verify transaction ID
    const valid = !!result
    // result is a hex encoded signature
    return { method, valid, result, message, sendDetails: data };
  } catch (error) { return { method, valid: false, error }; }
};
