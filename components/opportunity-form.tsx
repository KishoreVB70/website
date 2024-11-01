'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CredentialCheckbox } from "./credential-checkbox"

export default function OpportunityForm() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    entity: "",
    content: "",
    requiredCredentials: [] as string[]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCredentialChange = (selectedIds: string[]) => {
    setFormData(prevData => ({
      ...prevData,
      requiredCredentials: selectedIds
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Opportunity submitted:", formData)
    // Here you would typically send the data to an API or perform other actions
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <Label htmlFor="title">Opportunity Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the opportunity title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Enter a brief description of the opportunity"
          required
          className="h-12 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="entity">Entity</Label>
        <Input
          id="entity"
          name="entity"
          value={formData.entity}
          onChange={handleChange}
          placeholder="Enter the name of entity which is offereing this opportunity"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Opportunity Details</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write the full details of the opportunity here"
          required
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Required Credentials</Label>
        <CredentialCheckbox 
          selectedCredentials={formData.requiredCredentials}
          onSelectionChange={handleCredentialChange}
        />
      </div>

      <Button type="submit" className="w-full">Submit Opportunity</Button>
    </form>
  )
}
