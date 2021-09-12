import {Button, Container, makeStyles, TextField, Typography,} from "@material-ui/core";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";

interface IFormInput {
    email: string;
    lozinka: string;
}

const schema = yup.object().shape({
    email: yup.string().required().email().max(255),
    lozinka: yup.string().required().max(255),
});

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
        marginTop: theme.spacing(4),
    },
}));

function App() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const {heading, submitButton} = useStyles();

    const [json, setJson] = useState<string>();

    const onSubmit = (data: IFormInput) => {
        const jsonData = JSON.stringify(data);
        setJson(jsonData);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonData
        };

        fetch('http://localhost:3001/prijavi-osobu', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    };

    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h3">
                Dobrodosli
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    {...register("email")}
                    variant="outlined"
                    margin="normal"
                    label="Email"
                    helperText={errors.email?.message}
                    error={!!errors.email?.message}
                    fullWidth
                    required
                />
                <TextField
                    {...register("lozinka")}
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    helperText={errors.lozinka?.message}
                    error={!!errors.lozinka?.message}
                    type="password"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submitButton}
                >
                    Prijavi se
                </Button>
                {json && (
                    <>
                        <Typography variant="body1">
                            Below is the JSON that would normally get passed to the server
                            when a form gets submitted
                        </Typography>
                        <Typography variant="body2">{json}</Typography>
                    </>
                )}
            </form>
        </Container>
    );
}

export default App;