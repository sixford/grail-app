import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListGroup, Button } from "react-bootstrap"
import { getToken } from "../../lib/auth"
import LoadingSpinner from "../subcomponents/LoadingSpinner"

export default function Search() {
  const { query } = useParams()
  const navigate = useNavigate()

  const [searchData, setSearchData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query || query === "undefined") {
        setLoading(false)
        setError("Invalid search query")
        return
      }

      try {
        const headers = getToken() ? { Authorization: getToken() } : {}
        const { data } = await axios.get(`/api/items/?query=${query}`, { headers })

        console.log("✅ Search results:", data)
        setSearchData(data)
      } catch (err) {
        console.error("❌ Axios error:", err)
        setError("Error fetching search results")
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  const handleClick = (e) => {
    navigate(`/items/${e.target.id}`)
  }

  const goBack = () => {
    navigate(-1) || navigate("/")
  }

  return (
    <div className="container mt-5">
      <h5 className="text-center">
        {query ? (
          <>
            Showing results for <strong>"{query}"</strong>{" "}
            {searchData ? `(${searchData.length})` : ""}
          </>
        ) : (
          "No search term provided"
        )}
      </h5>

      <hr />

      {loading && <LoadingSpinner />}

      {error && (
        <p className="text-danger text-center mt-3">
          {error}
        </p>
      )}

      {!loading && !error && searchData?.length === 0 && (
        <p className="text-muted text-center">No items found.</p>
      )}

      {!loading && searchData && (
        <ListGroup className="my-4">
          {searchData.map((item) => (
            <ListGroup.Item
              key={item.id}
              style={{ cursor: "pointer" }}
              id={item.id}
              onClick={handleClick}
            >
{item.name} — {item.brand} — {item.colour} — Sizes: {Array.isArray(item.size) ? item.size.join(", ") : item.size}

            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <div className="text-center mt-3">
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </div>
  )
}

