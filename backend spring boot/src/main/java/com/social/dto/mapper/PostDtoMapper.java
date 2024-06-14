package com.social.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.social.dto.PostDto;
import com.social.dto.UserDto;
import com.social.model.Post;
import com.social.model.User;
import com.social.util.TweetUtil;

public class PostDtoMapper {
	
	public static PostDto toTwitDto(Post twit,User reqUser) {
		UserDto user=UserDtoMapper.toUserDto(twit.getUser());
		
		boolean isLiked=TweetUtil.isLikedByReqUser(reqUser, twit);
		boolean isRetwited=TweetUtil.isLikedByReqUser(reqUser, twit);
		
		List<Long> retwitUserId=new ArrayList<>();
		
		for(User user1 : twit.getRetwitUser()) {
			retwitUserId.add(user1.getId());
		}
		
		PostDto twitDto=new PostDto();
		twitDto.setId(twit.getId());
		twitDto.setContent(twit.getContent());
		twitDto.setCreatedAt(twit.getCreatedAt());
		twitDto.setImage(twit.getImage());
		twitDto.setTotalLikes(twit.getLikes().size());
		twitDto.setTotalReplies(twit.getReplyTwits().size());
		twitDto.setTotalRetweets(twit.getRetwitUser().size());
		twitDto.setUser(user);
		twitDto.setLiked(isLiked);
		twitDto.setRetwit(isRetwited);
		twitDto.setRetwitUsersId(retwitUserId);
		twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwits(), reqUser));
		twitDto.setVideo(twit.getVideo());
		twitDto.setIsMeal(twit.getIsMeal());
		
		
		return twitDto;
	}
	
	public static List<PostDto> toTwitDtos(List<Post> twits, User reqUser) {
		
		List<PostDto> twitDtos=new ArrayList<>();
		
		for(Post twit : twits) {
		
			PostDto twitDto=toReplyTwitDto(twit, reqUser);
		
			twitDtos.add(twitDto);
		}
		
		
		return twitDtos;
	}
	
	public static PostDto toReplyTwitDto(Post twit, User reqUser) {
		UserDto user=UserDtoMapper.toUserDto(twit.getUser());
		
		boolean isLiked=TweetUtil.isLikedByReqUser(reqUser, twit);
		boolean isRetwited=TweetUtil.isLikedByReqUser(reqUser, twit);
		
		List<Long> retwitUserId=new ArrayList<>();
		
		for(User user1 : twit.getRetwitUser()) {
			retwitUserId.add(user1.getId());
		}
		
		PostDto twitDto=new PostDto();
		twitDto.setId(twit.getId());
		twitDto.setContent(twit.getContent());
		twitDto.setCreatedAt(twit.getCreatedAt());
		twitDto.setImage(twit.getImage());
		twitDto.setTotalLikes(twit.getLikes().size());
		twitDto.setTotalReplies(twit.getReplyTwits().size());
		twitDto.setTotalRetweets(twit.getRetwitUser().size());
		twitDto.setUser(user);
		twitDto.setLiked(isLiked);
		twitDto.setRetwit(isRetwited);
		twitDto.setRetwitUsersId(retwitUserId);
		twitDto.setVideo(twit.getVideo());
		twitDto.setIsMeal(twit.getIsMeal());

		
		return twitDto;
	}
	
	


}
