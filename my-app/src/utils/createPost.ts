import { CreatePost } from '@/abi/CreatePost'
import { MiniKit } from '@worldcoin/minikit-js'

const createPost = async () => {
  const {commandPayload, finalPayload} = await MiniKit.commandsAsync.sendTransaction({
    transaction: [
      {
        address: '0x9Cf4F011F55Add3ECC1B1B497A3e9bd32183D6e8',
        abi: CreatePost,
        functionName: 'mintToken',
        args: ['0x126f7998Eb44Dd2d097A8AB2eBcb28dEA1646AC8'],
      },
    ],
  })
}