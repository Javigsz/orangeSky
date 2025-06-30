
import { redirect } from 'next/navigation'

export default function userProfilePosts( { params } : { params: { id: string } }) {
  redirect('/profile/' + params.id + '/posts')
}
