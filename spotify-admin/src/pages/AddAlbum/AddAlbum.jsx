import React, { useState } from 'react'
import axios from 'axios'
import { url } from '../../App'
import { toast } from 'react-toastify'

const AddAlbum = () => {

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [bgColour, setBgColour] = useState("#ffffff")
  const [image, setImage] = useState(null)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // ✅ Prevent empty file submission
    if (!image) {
      toast.error("Please select an image")
      return
    }

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("desc", desc)
      formData.append("bgColour", bgColour)
      formData.append("image", image)

      // ✅ Debug logs (VERY IMPORTANT)
      console.log("Sending to:", url + "/api/album/add")
      console.log("Image file:", image)

      const response = await axios.post(
        url + "/api/album/add",
        formData
        // ❌ Do NOT manually set Content-Type (axios handles it)
      )

      console.log("Response:", response.data)

      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log("ERROR:", error)
      toast.error("Upload failed")
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        type="color"
        value={bgColour}
        onChange={(e) => setBgColour(e.target.value)}
      />

      {/* ✅ Important: add name="image" */}
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Add Album</button>
    </form>
  )
}

export default AddAlbum

