"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: number
  name: string
  description: string
  price: number
  rating: number
  category: string
  image: string
  bestseller: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Ashwagandha Root Extract",
    description: "Organic stress relief & immune support supplement",
    price: 24.99,
    rating: 4.8,
    category: "Supplements",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: true,
  },
  {
    id: 2,
    name: "Triphala Formula",
    description: "Traditional digestive support blend",
    price: 19.99,
    rating: 4.6,
    category: "Supplements",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: false,
  },
  {
    id: 3,
    name: "Turmeric Curcumin",
    description: "Anti-inflammatory & antioxidant support",
    price: 22.99,
    rating: 4.9,
    category: "Supplements",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: true,
  },
  {
    id: 4,
    name: "Brahmi Mind Support",
    description: "Cognitive enhancement & mental clarity",
    price: 29.99,
    rating: 4.7,
    category: "Supplements",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: false,
  },
  {
    id: 5,
    name: "Neem Purifying Oil",
    description: "Natural skin purifier & cleanser",
    price: 18.99,
    rating: 4.5,
    category: "Oils",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: false,
  },
  {
    id: 6,
    name: "Ayurvedic Sleep Formula",
    description: "Natural sleep support with herbs",
    price: 26.99,
    rating: 4.8,
    category: "Supplements",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: true,
  },
  {
    id: 7,
    name: "Dosha Balance Tea",
    description: "Herbal tea blend for mind-body balance",
    price: 15.99,
    rating: 4.6,
    category: "Teas",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: false,
  },
  {
    id: 8,
    name: "Amla Berry Powder",
    description: "Vitamin C-rich immune support",
    price: 21.99,
    rating: 4.7,
    category: "Supplements",
    image: "/placeholder.svg?height=200&width=200",
    bestseller: false,
  },
]

export default function ProductGrid() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("popular")
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id])
    }
  }

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true
    return product.category.toLowerCase() === filter.toLowerCase()
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price
    if (sort === "price-high") return b.price - a.price
    if (sort === "rating") return b.rating - a.rating
    // Default: popular (bestsellers first)
    return b.bestseller === a.bestseller ? 0 : b.bestseller ? 1 : -1
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-400">Filter by:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] bg-black/40 border-green-500/30">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="supplements">Supplements</SelectItem>
              <SelectItem value="oils">Oils</SelectItem>
              <SelectItem value="teas">Teas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px] bg-black/40 border-green-500/30">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="product-card border-green-500/30 bg-black/40 overflow-hidden">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </Button>
              {product.bestseller && (
                <Badge className="absolute top-2 left-2 bg-green-500 text-white">Bestseller</Badge>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1 text-white">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{product.description}</p>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">{product.rating}</span>
              </div>
              <div className="text-lg font-bold text-white">${product.price.toFixed(2)}</div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {cart.includes(product.id) ? "Added to Cart" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

