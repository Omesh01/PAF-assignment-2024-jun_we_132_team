package com.social.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.social.dto.LikeDto;
import com.social.dto.PostDto;
import com.social.dto.UserDto;
import com.social.model.Like;
import com.social.model.User;

public class LikeDtoMapper {

	
	public static LikeDto toLikeDto(Like like,User reqUser) {
		
		UserDto user=UserDtoMapper.toUserDto(like.getUser());
		UserDto reqUserDto=UserDtoMapper.toUserDto(reqUser);
		PostDto twit =PostDtoMapper.toTwitDto(like.getTwit(),reqUser);
		
		LikeDto likeDto=new LikeDto();
		likeDto.setId(like.getId());
		likeDto.setTwit(twit);
		likeDto.setUser(user);
		
		return likeDto;
		
	}

	public static List<LikeDto> toLikeDtos(List<Like> likes,User reqUser) {
		
		List<LikeDto> likeDtos=new ArrayList<>() ;
		
		for(Like like:likes) {
			UserDto user=UserDtoMapper.toUserDto(like.getUser());
			PostDto twit =PostDtoMapper.toTwitDto(like.getTwit(),reqUser);
			
			LikeDto likeDto=new LikeDto();
			likeDto.setId(like.getId());
			likeDto.setTwit(twit);
			likeDto.setUser(user);
			
			likeDtos.add(likeDto);
		}
		
		
		
		return likeDtos;
		
	}
}
