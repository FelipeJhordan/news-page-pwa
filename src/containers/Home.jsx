import React, {memo, useEffect, useState} from "react";

import Column from "../components/column";
import Row from "../components/row";
import Api from '../api/api'

import './style.css'

import Economy from "./components/Economy";
import Technology from "./components/Technology";
import World from "./components/World";

function Home() {
   const [news, setNews] = useState([]) 
   const [loading, setLoading] = useState(false)

   const handleNews = (articles) => {
       setLoading(false)
       console.log(articles)
       setNews({
           world: articles[0]?.value,
           economy: articles[1]?.value,
           technology: articles[2]?.value
       })
       console.log(news)
   }


   useEffect(() => {
      setLoading(true)
      Promise.all([
          Api.getNews('world'),
          Api.getNews('economy'),
          Api.getNews('technology'),
      ]).then(handleNews)
   }, [])

   if (loading) return <div> Carregando </div>

   return (
        <div>
        <Row >
            <Column>
             <h2>World</h2>
             <World values={news?.world} />
            </Column>
        </Row>
        <Row verticalBorder>
            <Column>
             <h2>Economy</h2>
             <Economy values={news?.economy}></Economy>
            </Column>
        </Row>
        <Row verticalBorder>
            <Column>
             <h2>Technology</h2>
             <Technology values={news?.technology}/>
            </Column>
        </Row>
    </div>
   )
}

export default memo(Home)