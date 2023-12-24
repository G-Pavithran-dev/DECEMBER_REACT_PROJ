import { useState, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Info } from '@mui/icons-material'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import './imagify.css'

const ImageToogler = () => {
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy', onClick: copyToClipboard },
    { icon: <SaveIcon />, name: 'Save', onClick: saveImage },
    { icon: <PrintIcon />, name: 'Print', onClick: printImage },
    { icon: <ShareIcon />, name: 'Share', onClick: shareImage },
  ]
  const [clicked, setClicked] = useState(false)
  const imgRef = useRef()
  function shareImage() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Share Image',
          text: 'Check out this image!',
          url: imgRef.current.src,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      console.log('Web Share not supported on this browser')
    }
  }
  function printImage() {
    const url = imgRef.current.src
    const win = window.open('', '_self')
    win.document.write('<html><head><title>Imagify</title></head><body>')
    win.document.write('<img src="' + url + '" />')
    win.document.write('</body></html>')
    win.document.close()
    win.onafterprint = () => {
      window.location.reload()
    }
    win.print()
  }
  function saveImage() {
    const url = imgRef.current.src
    const link = document.createElement('a')
    link.href = url
    link.download = 'download.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  async function copyToClipboard() {
    try {
      const url = imgRef.current.src
      await navigator.clipboard.writeText(url)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ minHeight: '100vh', width: '100vw' }}
    >
      <Typography variant="h4" sx={{ fontFamily: 'serif', letterSpacing: 7,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
        <img src={process.env.PUBLIC_URL+"/imagify-favicon-black.png"} alt='logo' style={{width: '65px', height:'65px'}} /> IMAGIFY
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        sx={{
          border: '1px solid black',
          borderRadius: 4,
          padding: 2,
          cursor: 'pointer',
          bgcolor: '#f5f5f5',
        }}
        onClick={() => setClicked(true)}
      >
        <Typography variant="h6" sx={{}}>
          {clicked ? 'AFTER' : 'BEFORE'}
        </Typography>
        <img
          ref={imgRef}
          src={
            !clicked
              ? 'https://picsum.photos/810/569'
              : process.env.PUBLIC_URL + '/Library-page-image.jpg'
          }
          alt="before"
        />
      </Box>
      {!clicked && (
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Info />
          &nbsp;Click the image to see the magic
        </Typography>
      )}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default ImageToogler