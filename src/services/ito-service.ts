import CryptoJS from 'crypto-js';
import * as api from '../apis/ito-api';
import { CommonBilgi } from '../models/ito/ito-common';
import CompanyData from '../models/ito/ito-company-detail';
import NewspaperInfo from '../models/ito/ito-newspaper-informations';
import Address from '../models/ito/ito-branch-address';
import Official from '../models/ito/ito-officials';
import DocumentType from '../models/ito/ito-document-type';
import Partner from '../models/ito/ito-partners';
import * as dotenv from "dotenv";

let PRIVATE_KEY = '';

const getFirmaBilgi = async (mersisNo: string): Promise<any> => {
    dotenv.config();
    try {
        PRIVATE_KEY = process.env.PRIVATE_KEY;

        const payload = encryptIt(mersisNo);

        const firmaArry = await api.firmaRequest(payload);

        console.log(firmaArry)

        if (!firmaArry?.Result)
            throw 'Error while getting inital data';

        const firma = firmaArry.Data?.shift();

        const initialPart = getPayloadFirstPart(firma?.SicNumber);

        const isLimited = firma.Title.includes('LİMİTED');

        const isAnonim = firma.Title.includes('ANONİM');

        const detail = await companyDetail(initialPart);

        const newsPaper = await newsPaperInfo(initialPart);

        const address = await branchAddress(initialPart);

        const officials = await companyOfficials(initialPart);

        const officialsOld = await companyOfficialsOld(initialPart);

        const documentType = await documentTypes(initialPart);

        const partners = !isAnonim ? await partnerList(initialPart) : null;

        const partnersOld = !isAnonim ? await partnersListOld(initialPart) : null;

        const directors = !isLimited ? await directorList(initialPart) : null;

        const directorsOld = !isLimited ? await directorListOld(initialPart) : null;

        const result = {
            firma, detail, newsPaper, address, officials, officialsOld,
            partners, partnersOld, directors, directorsOld, documentType
        }

        return result;
    }
    catch(err){
        return err;
    }
}

const companyDetail = async (firstPart: string): Promise<CommonBilgi<CompanyData>> => await api.companyDetailRequest(encryptDetail(firstPart, '&hiMami=true'));
const newsPaperInfo = async (firstPart: string): Promise<CommonBilgi<NewspaperInfo>> => await api.newsPaperInfo(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));
const branchAddress = async (firstPart: string): Promise<CommonBilgi<Address>> => await api.branchAddress(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));
const companyOfficials = async (firstPart: string): Promise<CommonBilgi<Official>> => await api.companyOfficials(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));
const companyOfficialsOld = async (firstPart: string): Promise<CommonBilgi<Official>> => await api.companyOfficialsOld(encryptDetail(firstPart, '&PageIndex=1&PageSize=10&hiMami=true'));
const documentTypes = async (firstPart: string): Promise<CommonBilgi<DocumentType>> => await api.documentType(encryptDetail(firstPart, '&hiMami=true'));
const partnerList = async (firstPart: string): Promise<CommonBilgi<Partner>> => await api.partners(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));
const partnersListOld = async (firstPart: string): Promise<CommonBilgi<Partner>> => await api.partnersOld(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));
const directorList = async (firstPart: string): Promise<CommonBilgi<Partner>> => await api.directors(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));
const directorListOld = async (firstPart: string): Promise<CommonBilgi<Partner>> => await api.directorsOld(encryptDetail(firstPart, '&PageIndex=1&PageSize=15&hiMami=true'));

const getPayloadFirstPart = (sicNumber: string): string => {
    var reg = /(\d+)-(\d+)/;
    var match = sicNumber.match(reg);
    if (!match)
        throw "Couldn't get sicil number";
    return `SICNO=${match[1]}&MUKER=${match[2]}`;
}

const decryptIt = (baseText: string): string => {

    var base64 = CryptoJS.enc.Base64.parse(baseText)

    var ciphertext = CryptoJS.enc.Utf8.stringify(base64);

    var bytes = CryptoJS.AES.decrypt(
        ciphertext,
        PRIVATE_KEY
    );

    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}

const encryptIt = (mersisNo: string): string => {

    const native = `"MRSNO=${mersisNo.padStart(16, '0')}&PageIndex=1&PageSize=15&hiMami=true"`;

    const payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(native), PRIVATE_KEY).toString()));
    console.log(payload);

    return payload;
}

const encryptDetail = (initial: string, last: string): string => {

    const native = `"${initial}${last}"`;

    const payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(native), PRIVATE_KEY).toString()));

    return payload;
}

export {
    getFirmaBilgi
}

