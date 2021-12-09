const sc = require('sourcecred').sourcecred;
const fs = require("fs");

const LEDGER_PATH = './../data/ledger.json';

const Ledger = sc.ledger.ledger.Ledger;

function load_ledger() {
    const ledgerJSON = fs.readFileSync(LEDGER_PATH, 'utf8');
    const ledger = Ledger.parse(ledgerJSON);
    return ledger
}

const ledger = load_ledger()

function addPayoutAddresses(accountName, payoutAddress) {

    const account = ledger.accountByName(accountName)
    if (account.payoutAddresses.size === 0){
        ledger.setPayoutAddress(
            account.identity.id, // id
            payoutAddress, // payoutAddress
            "1", // chainId
            "0xa117000000f279D81A1D3cc75430fAA017FA5A2e" // ANT tokenAddress
        )

        console.log(`Payout address ${payoutAddress} added to account ${account.identity.id} (${accountName})`)
    }
    else if (account.payoutAddresses.values().next().value === payoutAddress){
        console.log(`Payout address ${payoutAddress} is already added to account ${account.identity.id} (${accountName})`)
    } else {
        console.log(
            "CONFLICTING PAYOUT ADDRESS\n",
            `   ${payoutAddress} diverges from address\n`,
            `   ${account.payoutAddresses.values().next().value} being already added to account ${account.identity.id} (${accountName})\n`,
            "   Use the replace address method if this was intentional."
        )
    }
}
addresses = {
    "Shawn-Cubbedge": "0xF67825D3bdE95a0Bbb1a063e06D51b79e7061C05",
    "DreamerM": "0xfFd9Cd75445459184a4b89A0fBd1720aB2957738",
    "anson-parker": "0x9aB3971e1b065701C72C5f3cAFbF33118dC51ae9",
    "lee0007": "0x3E31155a1c17c9F85e74828447aec412090a4622",
    "Carla78": "0xaf5a1F7fCeda39A76A68708700BC93ABff9952e3",
    "Renzo-D5": "0x489aDd7680605f6Fc4806595CD75E65D7F1675Eb",
    "Christian-Q": "0x2213A3c4a1377439f2B866c3a0EAD7E9929EEc4B",
    "Sonny": "0x4959B7CceF60935197A80D0e1b0ACe95CC0566C2",
    "hun": "0x1A461ACf2E664eAe23667FC5c6C0165b1C256Bbf",
    "Luiz-Fernando": "0x3d958C62b36e01018644538Bd1998C1E9BE1dDD8",
    "Dustin-cal": "0x19075CdB05f3a4E2607F0C0F442B7F2769BB3e37",
    "a11n": "0x51d505ee130ED41c107F1bdf62950573fF50D8C0",
    "Paulo-Fonseca---Designer---UTC": "0xb36ed58362f483EA8A8237889883f8049BaB8B3e",
    "p1modi": "0x18E8Ab6fd5a685C2008277F0484f8fcbFc448Bdc",
    "Michiel---": "0xcF0eBaA2bC9Ba3bb8c655fABB26976528d64FCB7",
    "Karo": "0x112A8Ac1D0c9F7848aFb9c87B546A5deDdCADbd4",
    "Eagle": "0x75cD58A01883C6A115A1293C4Dd4CE67D11928f0",
    "Nya--limu": "0x883753Beab357A2c29f3766C6ad158e72A78ce51",
    "Teal": "0x9b55D80Af9dd8D23C372915Ad55c010799010b4d"
}

Object.entries(addresses).forEach(
    ([key, value]) => addPayoutAddresses(key,value)
)

fs.writeFileSync(LEDGER_PATH, ledger.serialize())

