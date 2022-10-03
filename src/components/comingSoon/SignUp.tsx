import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import './comingSoonCss/SignUp.css'

interface Props {
  
  setOpenIt: React.Dispatch<React.SetStateAction<boolean>>

}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://beiyajioni.shop/">
        Bei Ya Jioni
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props: Props) {
    const { setOpenIt } = props;
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [firstname, setFirstname] = React.useState<string>("");
    const [lastname, setLastname] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [telephone, setTelephone] = React.useState<string>("");

    //image upload states
    const [image, setImage] = React.useState<string | Blob>();
    const [uploadingImg, setUploadingImg] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState('');
    const placeholderPic = `${process.env.REACT_APP_PLACEHOLDER_IMAGE}`


    

    function validateImg(event: React.ChangeEvent<HTMLInputElement>) {
        
        if(!event!.target.files) {return}
        else{
            const file = event!.target.files[0];
            if (file.size >= 1048576) {
                return alert("Max file size is 1mb");
            } else {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
            }
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image!);
        data.append("upload_preset", "chatSignin");
        // console.log(data)
        try {
            setUploadingImg(true);
            let res = await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
                method: "POST",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }
    

  const handleSubmit = async(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    if(!email || !password || !firstname || !lastname || !telephone || !username) return alert('all fields of form need to be filled!')
    let url: string = await uploadImage()
    // console.log(e.currentTarget)
    
    
    if(uploadingImg===false)
    {    
        let requestData = JSON.stringify({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            username: username,
            telephone: telephone,
            picture: url
            })
                
        fetch(`${process.env.REACT_APP_BYJ_API_URL}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: requestData
        } )
        setOpenIt(true)
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setUsername('')
        setTelephone('')
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
        <Stack sx={{mb:2, mt:2}}>
            <div className="signup-profile-pic__container">
                <img src={imagePreview || placeholderPic} alt="avatar placeholder" className="signup-profile-pic" />
                <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
        </Stack>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          
          {/* <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstname(e.target.value)} value={firstname}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={(e) => setLastname(e.target.value)} value={lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="What should we call you?"
                  name="username"
                  autoComplete="Username"
                  onChange={(e) => setUsername(e.target.value)} value={username}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telephone"
                  label="Tel. number"
                  name="telephone"
                  autoComplete="Phone"
                  onChange={(e) => setTelephone(e.target.value)} value={telephone}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#1a75ff', mt: 3, mb: 2 }}
            >
              Complete Registration
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}