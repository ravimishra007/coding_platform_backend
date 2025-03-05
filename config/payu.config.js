import Payu from "payu-websdk"

const payu_key = process.env.MERCHANT_KEY 
const payu_salt = process.env.MERCHANT_SALT 

// create a client

const payuClient = new Payu({
    key:payu_key,
    salt:payu_salt
},process.env.PAYU_ENVIRONMENT)

export const PayData = {
    payuClient,
    payu_key,
    payu_salt

}