import Head from "next/head";
import {useEffect, useState} from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home(initialData) {
    const [formInputs, setFormInputs] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(
        'cats'
    );

    useEffect(() => {
        setSearchResults(initialData?.catGiphys?.data)
    }, [initialData]);

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value });
    }
    
    const search = async (event) => {
      event.preventDefault();
      let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=DC3GAO8uClveIiNSRzIzBrBQgJhobcQA&limit=6`);
      giphys = await giphys.json();
      setSearchTerm(formInputs.searchTerm);
      setSearchResults(giphys.data);
    }

  return (
      <>
          <div className='container'>
              <Head>
                  <title>Giphy Search App</title>
                  <meta name="description"
                        content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation" />
                  <link rel="icon" href="/favicon.ico"/>
                  <link rel="stylesheet" href="/styles.css"/>
              </Head>

              <form onSubmit={search}>
                  <input type="text" name="searchTerm" onChange={handleInputs}/>
                  <button type="submit">Search</button>
              </form>

              <h1>Search results for: {searchTerm}</h1>

              <Link href="/search/[pid]" as={`/search/${searchTerm}`}>
                  {`http://localhost:3000/search/${searchTerm}`}
              </Link>

              <div className="giphy-search-results-grid">
                  {searchResults.map((each, index) => {
                      return (
                          <div key={index}>
                              <h3>{each.title}</h3>
                              <img src={each.images.original.url} alt={each.title}/>
                          </div>
                      )
                  })}
              </div>
          </div>
          <Footer />
      </>
  );
}

export async function getStaticProps() {
    let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=DC3GAO8uClveIiNSRzIzBrBQgJhobcQA&limit=6');
    catGiphys = await catGiphys.json();
    return {props: {catGiphys: catGiphys}}
}
