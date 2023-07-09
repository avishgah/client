import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";


const submit = (details) => {
    console.log(details);
    alert(" נא לשים את האפנים בעמדה פנויה, תודה ולהתראות" )
}


const Returns = () => {

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });


    return (<>
        <h1>הקש תעודת זהות</h1>
        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Box component="form" noValidate autoComplete="off">
                <TextField id="outlined-basic" label="id" variant="outlined" {...register("tz", { required: true, pattern: /^[0-9]{1,9}/ })} />
                {errors.ID?.type == "pattern" && <div className="error">
                    {/* אפשרי גם קטן מ-9 */}
                    תעודת זהות לא תקינה
                </div>}
                {errors.ID?.type == "required" &&
                    <div className="error">
                        שדה חובה
                    </div>}
                <br></br>

            </Box>

            <Stack direction="row" spacing={2}>

                <Button variant="contained" id="addR" type="submit">
                    סיום
                </Button>

            </Stack>
        </form>
    </>
    )
}

export default Returns;