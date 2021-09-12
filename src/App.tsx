import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IFormInput {
    email: string;
    password: string;
}

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
    } = useForm<IFormInput>();

    const { heading, submitButton } = useStyles();

    const [json, setJson] = useState<string>();

    const onSubmit = (data: IFormInput) => {
        setJson(JSON.stringify(data));
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
                    fullWidth
                    required
                />
                <TextField
                    {...register("password")}
                    variant="outlined"
                    margin="normal"
                    label="Password"
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