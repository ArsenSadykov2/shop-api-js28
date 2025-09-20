import {Button, MenuItem, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import type {ProductMutation} from "../../../../types";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectCategories, selectFetchingCategories} from "../../../categories/categoriesSlice.ts";
import {fetchCategories} from "../../../categories/categoriesThunks.ts";
import Spinner from "../../../../components/UI/Spinner/Spinner.tsx";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmitProduct}) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectFetchingCategories);

    const [form, setForm] = useState<ProductMutation>({
        category: '',
        title: '',
        description: '',
        price: 0,
        image: null,
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitProduct({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };
    return (
        <form onSubmit={onSubmit} style={{ width: "50%", margin: "0 auto" }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%", marginBottom: "10px"}}
                        select
                        id="category"
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={onInputChange}
                        required
                    >
                        <MenuItem value="" disabled>Please select a category</MenuItem>
                        {categoriesLoading && <div style={{marginLeft: '50%'}}><Spinner/></div>}
                        {categories.map(category => (
                            <MenuItem
                                key={category._id}
                                value={category._id}
                            >
                                {category.title}
                            </MenuItem>
                        ))}
                    </TextField>
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
                    <FileInput
                        name="image"
                        label="Image"
                        onChange={fileInputChangeHandler}
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