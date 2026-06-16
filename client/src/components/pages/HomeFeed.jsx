import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../subcomponents/LoadingSpinner"
import FormModal from "../subcomponents/FormModal"

export default function HomeFeed() {
  const args = { headers: { authorization: `Bearer ${getToken()}` } }
  const [itemData, setItemData] = useState([])
  const [error, setError] = useState()
  const [nextItem, setNextItem] = useState()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})
  const [editingItemId, setEditingItemId] = useState(null)
  const navigate = useNavigate()
  const token = getToken()

  useEffect(() => {
    if (nextItem) navigate(`/items/${nextItem}`)
  }, [nextItem, navigate])

  useEffect(() => {
    async function getItemData() {
      try {
        const response = await axios.get("/api/items/", args)
        setItemData(response.data)
      } catch (error) {
        setError(error)
      }
    }
    getItemData()
  }, [])

  const fetchItemData = async () => {
    try {
      const response = await axios.get("/api/items/", args)
      setItemData(response.data)
    } catch (error) {
      setError(error)
    }
  }

  const handleAddItem = () => {
    setEditingItemId(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEditItem = (item) => {
    setEditingItemId(item.id)
    setFormData(item)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItemId) {
        await axios.put(`/api/items/${editingItemId}/`, formData, args)
      } else {
        await axios.post('/api/items/', formData, args)
      }
      setShowModal(false)
      fetchItemData()
    } catch (error) {
      console.log(error)
    }
  }

  const isOwner = (item) => {
    return item.owner === token.user_id
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <section className="px-6 md:px-16 pt-16 pb-10 text-center border-b border-ink/10">
        <p className="font-sans text-sm tracking-widest2 uppercase text-electric underline mb-4">
          The Marketplace
        </p>
        <h1 className="font-serif text-electric text-[12vw] md:text-[6vw] leading-[1.05] tracking-tight">
          FIND YOUR <span className="italic">NEXT</span> PAIR
        </h1>
        <button
          onClick={handleAddItem}
          className="mt-8 inline-block bg-electric text-cream px-10 py-3 font-sans text-sm uppercase tracking-widest2 hover:bg-ink transition-colors duration-300"
        >
          Add Item
        </button>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-16 py-12">
        {itemData.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemData.map((item, index) => {
              const { owner, image_1, brand, name, id } = item
              const accentColor = index % 2 === 0 ? 'border-electric' : 'border-amber'
              const accentText = index % 2 === 0 ? 'text-electric' : 'text-amber'
              return (
                <div key={id} className={`bg-cream group border ${accentColor} transition-colors`}>
                  <div
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() => setNextItem(id)}
                  >
                    <img
                      src={image_1}
                      alt={brand}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-serif text-cream text-2xl md:text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {brand}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-serif text-lg">{name}</p>
                    <p className={`font-sans text-xs uppercase tracking-widest2 mt-1 ${accentText}`}>
                      {owner.username}
                    </p>
                    {isOwner(item) && (
                      <button
                        onClick={() => handleEditItem(item)}
                        className={`mt-3 border ${accentColor} px-4 py-1.5 font-sans text-xs uppercase tracking-widest2 hover:bg-ink hover:text-cream hover:border-ink transition-colors`}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex justify-center py-20">
            {error ? <p className="text-red-600">{error.message}</p> : <LoadingSpinner />}
          </div>
        )}
      </section>

      <FormModal
        show={showModal}
        handleClose={handleModalClose}
        handleSubmit={handleModalSubmit}
        title={editingItemId ? "Edit Item" : "Add New Item"}
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
      />
    </div>
  )
}