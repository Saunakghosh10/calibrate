import { auth, currentUser } from "@clerk/nextjs"
import { prisma } from "@/lib/db"

export async function ensureUserExists() {
  const { userId } = auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  let user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    // Get user details from Clerk using currentUser
    const clerkUser = await currentUser()
    if (!clerkUser) {
      throw new Error("Clerk user not found")
    }
    
    // Create user in our database
    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName || null,
        lastName: clerkUser.lastName || null,
      }
    })
  }

  return user
} 