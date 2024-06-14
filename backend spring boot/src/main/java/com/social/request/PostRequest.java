package com.social.request;

import java.time.LocalDateTime;

import com.social.model.Post;

import lombok.Data;

@Data
public class PostRequest {
	
    private String content;
    
    private Long twitId;

    private LocalDateTime createdAt;

    private String image; 
    
    private boolean isReply;
    
    private boolean isTwit;
    
    private Long replyFor;

    private String isMeal;


}
