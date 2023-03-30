import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ChipInput({ tags, setTags }) {


    return (
        <Autocomplete
            multiple
            id="tags"
            value={tags}
            onChange={(event, newTag) => {
                setTags([
                    ...newTag
                ]);

            }}
            options={AllTags}
            getOptionLabel={(option) => option.tag}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={option.tag}
                        {...getTagProps({ index })}

                    />
                ))
            }
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="tags separes par virgule" placeholder="tags" />
            )}
        />
    );
}


const AllTags = [
    { tag: 'js', },
    { tag: 'sass', },
    { tag: 'css', },
    { tag: 'sun', },
    { tag: 'java' },
    { tag: "db" },
    { tag: 'autres', },
]