import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useShowMsg = ({
	message,
	type = 'success',
	duration = 3000,
} = {}) => {
	return (msg = message) =>
		ElMessage({
			showClose: true,
			message: msg,
			type,
			duration,
		})
}

export function useReq() {
	const elRef = ref()
	const store = useStore()
	const router = useRouter()
	const showMsg = useShowMsg()
	const showErrorMsg = useShowMsg({ type: 'error' })

	const request = async ({ name, payload, msg }) => {
		try {
			await elRef.value.validate()
			await store.dispatch(name, payload)

			showMsg(msg)
			router.push('/goods')
		} catch (error) {
			if (error.name === 'HTTPError') {
				const err = await error.response.json()

				return showErrorMsg(err.msg)
			}

			console.error(error)
		}
	}

	return {
		elRef,
		request,
	}
}
