import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import './componentCss/SignUp.css'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
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

export default function SignUp() {
    //image upload states
    const [image, setImage] = React.useState<string | Blob>();
    const [uploadingImg, setUploadingImg] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState('');
    const placeholderPic = `https://via.placeholder.com/150/FFFFFF/000000/?text=picture`


    

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
        console.log(data)
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

    

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    let url: string = await uploadImage()
    console.log(e.currentTarget)
    
    
    if(uploadingImg==false)
    {    
        const data = new FormData(e.currentTarget);
        console.log(data)
        data.append("picture", url)
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        username: data.get('username'),
        telephone: data.get('telephone'),
        picture: data.get('picture')
        });}
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Stack>
            <div className="signup-profile-pic__container">
                <img src={imagePreview || placeholderPic} alt="avatar placeholder" className="signup-profile-pic" />
                <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
          </Stack>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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