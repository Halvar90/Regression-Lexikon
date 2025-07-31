"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

       interface Review {
         id: number
         username: string
         rating: number
         comment: string
       }

interface DiscordReviewsProps {
  reviews: Review[]
}

export function DiscordReviews({ reviews }: DiscordReviewsProps) {
         const renderStars = (rating: number) => {
         return "★".repeat(rating) + "☆".repeat(5 - rating)
       }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <Card key={review.id} className="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
                     <CardTitle className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <div>
               <div className="font-semibold text-sm">{review.username}</div>
             </div>
           </div>
           <span className="text-yellow-500 text-lg">{renderStars(review.rating)}</span>
         </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              "{review.comment}"
            </blockquote>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 