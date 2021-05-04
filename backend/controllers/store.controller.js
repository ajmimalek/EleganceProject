const puppeteer =require ('puppeteer');

 async function getShop (url,page){
    await page.goto(url);

    const h1=await page.$eval(".entry-left h1", h1=>h1.textContent );
    const price=await page.$eval(".amount", price=>price.textContent );
    const img=await page.$eval(".woocommerce-product-gallery__wrapper img", img=>img.src );
    return{
        Image : img,
        Price : price,
        Title : h1
    }

};


async function getLinks(){

    const browser =await puppeteer.launch({headless:true});
    const page =await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://shopa.tn/categorie/mode-homme/vetements-homme/pulls-gilets-homme/');
    const Links =await page.$$eval('.clearfix .custom-product-thumbnail a' , allAs => allAs.map(a => a.href));
    await browser.close();
    return Links;

}

exports.tshirtController = async (req, res) => {
    const allLinks =await getLinks();

    const browser =await puppeteer.launch({headless:true});
    const page =await browser.newPage();
    const scrapedData = [];
    //console.log(allLinks);
    for (let link of allLinks){

        const data = await getShop(link,page);
        scrapedData.push(data);
    }
    console.log(scrapedData);
      await browser.close();
    return res.status(200).json(scrapedData);  


}
