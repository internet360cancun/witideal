export default function grantAcces (isPromoter,isAuthenticated,promRoute){
    if ((!promRoute && isAuthenticated)||(isPromoter && isAuthenticated)) {
        return true;
    } else {
        return false
    }
}