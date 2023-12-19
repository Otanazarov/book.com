import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class FindAllSavedDto{
    @ApiProperty({required:false})
    @IsInt()
    @IsOptional()
    @Type( () => Number)
    page:number
    
    @ApiProperty({required:false})
    @IsInt()
    @IsOptional()
    @Type( () => Number)
    limit:number
}