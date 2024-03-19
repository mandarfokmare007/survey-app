export const ROLE_PROVIDERS = 'Providers';
export const ROLE_STAFF = 'Staff';
export const ROLE_CLINICIANS = 'Clinicians';

export const TOAST_SEVERITY_SUCCESS = 'success';
export const TOAST_SEVERITY_ERROR = 'error';
export const TOAST_SEVERITY_INFO = 'info';
export const isRTMUser=()=>{
    const productData=JSON.parse(localStorage.getItem('headerObject')!);
    const productID=productData.productId;
    if(productID === 3){
     return true
    }
    else{
      return false
    }
}