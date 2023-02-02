const { create } = require("ipfs-http-client");
const fs = require("fs")
// Login to infura.io and go to IPFS to create a project, after creating the project you will get the INFURA_SECRET_KEY and INFURA_ID set them here.
const INFURA_ID="";
const INFURA_SECRET_KEY=""
const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
              headers: {
               authorization: auth, // infura auth credentails
           },
        }
    );
    return ipfs;
}


async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome ${new Date()}`);
    console.log(result);
}
// saveText();

async function saveFile() {

    let ipfs = await ipfsClient();

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    console.log(result)
}
saveFile()

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}

// getData("QmQbA7BrBNkh1bbSgtUYdUJYsHRfvRN6k5vocxHgjadUjr")
