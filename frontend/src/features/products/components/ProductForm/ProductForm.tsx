import {Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import type {ProductMutation} from "../../../../types";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmitProduct}) => {
    const [form, setForm] = useState<ProductMutation>({
        title: '',
        description: '',
        price: 0,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitProduct({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <form onSubmit={onSubmit} style={{ width: "50%", margin: "0 auto" }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        InputProps={{inputProps: {min: 1}}}
                        type="number"
                        id="price"
                        label="Price"
                        name="price"
                        value={form.price}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        multiline rows={3}
                        id="description"
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{ width: "100%"}}
                        type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;