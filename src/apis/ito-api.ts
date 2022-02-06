import axios from 'axios';
import  FirmaData  from '../models/ito/ito-firma-bilgi';
import { CommonBilgi } from '../models/ito/ito-common';
import CompanyData from '../models/ito/ito-company-detail';
import NewspaperInfo from '../models/ito/ito-newspaper-informations';
import Address from '../models/ito/ito-branch-address';
import Official from '../models/ito/ito-officials';
import DocumentType from '../models/ito/ito-document-type';
import Partner from '../models/ito/ito-partners';

const FIRMA_BILGI_URL = 'https://bilgibankasi.ito.org.tr/tr/api/mersisno';
const COMPANY_DETAIL = 'https://bilgibankasi.ito.org.tr/tr/api/company-detail';
const NEWSPAPER_INFORMATIONS = 'https://bilgibankasi.ito.org.tr/tr/api/company-newspaper-informations';
const BRANCH_ADDRESS = 'https://bilgibankasi.ito.org.tr/tr/api/company-branch-address';
const COMPANY_OFFICIALS = 'https://bilgibankasi.ito.org.tr/tr/api/company-officials';
const COMPANY_OFFICIALS_OLD = 'https://bilgibankasi.ito.org.tr/tr/api/old-company-officials';
const DOCUMENT_TYPE = 'https://bilgibankasi.ito.org.tr/tr/api/standart-documents-documents-type';
const PARTNERS_OLD = 'https://bilgibankasi.ito.org.tr/tr/api/old-partners';
const PARTNERS = 'https://bilgibankasi.ito.org.tr/tr/api/partners';
const DIRECTOR = 'https://bilgibankasi.ito.org.tr/tr/api/board-of-director';
const DIRECTOR_OLD = 'https://bilgibankasi.ito.org.tr/tr/api/old-board-of-director';


const CONFIG = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const firmaRequest = async (payload: string): Promise<CommonBilgi<FirmaData>> => await itoRequest<FirmaData>(payload, FIRMA_BILGI_URL);

const companyDetailRequest = async (payload: string): Promise<CommonBilgi<CompanyData>> => await itoRequest<CompanyData>(payload, COMPANY_DETAIL);

const newsPaperInfo = async (payload: string): Promise<CommonBilgi<NewspaperInfo>> => await itoRequest<NewspaperInfo>(payload, NEWSPAPER_INFORMATIONS);

const branchAddress = async (payload: string): Promise<CommonBilgi<Address>> => await itoRequest<Address>(payload, BRANCH_ADDRESS);

const companyOfficials = async (payload: string): Promise<CommonBilgi<Official>> => await itoRequest<Official>(payload, COMPANY_OFFICIALS);

const companyOfficialsOld = async (payload: string): Promise<CommonBilgi<Official>> => await itoRequest<Official>(payload, COMPANY_OFFICIALS_OLD);

const documentType = async (payload: string): Promise<CommonBilgi<DocumentType>> => await itoRequest<DocumentType>(payload, DOCUMENT_TYPE);

const partners = async (payload: string): Promise<CommonBilgi<Partner>> => await itoRequest<Partner>(payload, PARTNERS);

const partnersOld = async (payload: string): Promise<CommonBilgi<Partner>> => await itoRequest<Partner>(payload, PARTNERS_OLD);

const directors = async (payload: string): Promise<CommonBilgi<Partner>> => await itoRequest<Partner>(payload, DIRECTOR);

const directorsOld = async (payload: string): Promise<CommonBilgi<Partner>> => await itoRequest<Partner>(payload, DIRECTOR_OLD);


const itoRequest = async<T>(payload: string, url: string): Promise<CommonBilgi<T>> => {

    const params = new URLSearchParams();

    params.append('params', payload);

    const data = await axios.post(url, params, CONFIG).then(res => res.data);

    const final = data as CommonBilgi<T>;

    return final;
}


export {
    firmaRequest,
    companyDetailRequest,
    newsPaperInfo,
    branchAddress,
    companyOfficials,
    companyOfficialsOld,
    documentType,
    partners,
    partnersOld,
    directors,
    directorsOld
}