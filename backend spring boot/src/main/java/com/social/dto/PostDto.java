package com.social.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
	
	private Long id;

	private String content;
	
	private String image;
	
	private String video;
	
	private UserDto user;
	
	private LocalDateTime createdAt;
	
	private int totalLikes;
	
	private int totalReplies;
	
	private int totalRetweets;
	
    private boolean isLiked;
    
    private boolean isRetwit;
    
    private List<Long> retwitUsersId;
    
    private List<PostDto> replyTwits;

	private String isMeal;
	
}
