"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddProject() {
  const [description, setDescription] = useState("")
  const maxLength = 180

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-[#1B2228] border-[#C1A461]/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#C1A461] text-2xl font-semibold">Add Project</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Project Title"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Description <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Textarea
                placeholder="Project Description"
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40 min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={maxLength}
              />
              <span className="absolute bottom-2 right-2 text-sm text-[#C1A461]/60">
                {maxLength - description.length} characters left
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Skills <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus:ring-[#C1A461]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="blockchain">Blockchain Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Sub Skills <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus:ring-[#C1A461]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="solidity">Solidity</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Link <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="https://example.com"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40"
            />
          </div>

          <Button className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">
            Add Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}