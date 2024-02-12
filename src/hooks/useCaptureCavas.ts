import html2canvas from 'html2canvas'
import { RefObject } from 'react'

export const useCaptureCanvas = (ref: RefObject<HTMLElement>) => {
	const captureAndDownload = async (filename: string = 'download.png') => {
		if (ref.current) {
			try {
				const canvasImage = await html2canvas(ref.current, {
					useCORS: true,
					allowTaint: true,
					scale: 3,
					removeContainer: false,
					backgroundColor: 'transparent',
				})

				const image = canvasImage.toDataURL('image/png', 1.0)
				const downloadLink = document.createElement('a')
				downloadLink.href = image
				downloadLink.download = filename + '.png'
				downloadLink.click()

				return image
			} catch (error) {
				console.log(error)
			}
		}
	}

	return { captureAndDownload }
}
