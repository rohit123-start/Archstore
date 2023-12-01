const axios = require('axios');
const fs = require('fs')
const CircularJSON = require('circular-json')
const base_url = 'https://catfact.ninja/breeds';

// check console.log() for group by country

//written the response in a file as it is
const WritetoFiles = async () => {
    try{
        const res = await axios.get(`${base_url}`)
        fs.writeFileSync('catfact.txt', CircularJSON.stringify(res))
        console.log("response has been written as it is in catfact.txt")
    }
    catch(error){
        console.log("API Error:-",error)
    }
    
}

WritetoFiles()

//fetching total number of pages
const getNumberOfPages = async () => {
    try{
        const res = await axios.get(base_url)
        const total_pages = res.data.last_page
        console.log("Number of pages:- ",total_pages)
        return total_pages
    }
    catch(err){
        console.log("Error appeared in getting total number of pages:-", error)
        return 0
    }
    
}

getNumberOfPages()

// fetching the data of each page
const fetchData = async (page) => {
    try{
        const res = await axios.get(`${base_url}?page=${page}`)
        return res.data
    }
    catch(err){
        console.log("unable to fetch data of each page",err)
        return null
    }
}

// getting data from all pages by concat method
const getalldata = async () => {
    let allpages = []
    let total_pages = await getNumberOfPages()
    for(let page=1;page<=total_pages;page++){
        const res = await fetchData(page)
        if(res){
            allpages = allpages.concat(res.data)
            
        }  
    }
    console.log(groupedbycountry(allpages))
    return groupedbycountry(allpages)
    
}

// converting json into cat breed grouped by countries
const groupedbycountry = (data) => {
    const groupofcountries = {}
    data.forEach(element => {
        if(!groupofcountries[element.country]){
            groupofcountries[element.country] = [] 
        }
        const { country , ...remainingobj } = element
        groupofcountries[element.country].push(remainingobj)
    });
    return groupofcountries
}

getalldata()

fetchData()





  


