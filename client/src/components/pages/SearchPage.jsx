import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ListGroup, Button } from "react-bootstrap"

import { getToken } from "../../lib/auth"
import LoadingSpinner from "../subcomponents/LoadingSpinner"

export default function Search() {
  const [searchData, setSearchData] = useState()
  const [error, setError] = useState()

  const location = useLocation()
  const navigate = useNavigate()
  const options = { headers: { Authorization: getToken() } }

  const rawQuery = new URLSearchParams(location.search).get('q') || ''

  // You could also parse the query to split into individual filters
  const [brand, type, colour, size] = rawQuery.split(' ')

  useEffect(() => {
    async function getData() {
      try {
        let url = `/api/items/?`

        if (brand) url += `brand=${brand}&`
        if (type) url += `type=${type}&`
        if (colour) url += `colour=${colour}&`
        if (size) url += `size=${size}&`

        const { data } = await axios.get(url, options)
        setSearchData(data)
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
    }

    if (rawQuery) getData()
  }, [rawQuery])

  function goBack() {
    navigate(-1)
  }

  return (
    <div className="px-3">
      {searchData ? (
        <p style={{ color: "black", textAlign: "center", marginTop: "30px" }}>
          Showing results for "{rawQuery}" ({searchData.length})
        </p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : null}

      <ListGroup className="search-list my-5">
        <hr />
        {searchData ? (
          searchData.map(item => (
            <ListGroup.Item
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/items/${item.id}`)}
            >
              {item.name} – {item.brand} – {item.type} – Size {item.size}
            </ListGroup.Item>
          ))
        ) : (
          <LoadingSpinner />
        )}
        <Button className="search-btn my-4" onClick={goBack}>Back</Button>
      </ListGroup>
    </div>
  )
}
