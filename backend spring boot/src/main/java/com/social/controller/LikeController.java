package com.social.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.dto.LikeDto;
import com.social.dto.PostDto;
import com.social.dto.mapper.LikeDtoMapper;
import com.social.dto.mapper.PostDtoMapper;
import com.social.exception.LikeException;
import com.social.exception.PostException;
import com.social.exception.UserException;
import com.social.model.Like;
import com.social.model.User;
import com.social.service.LikesService;
import com.social.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@Tag(name="Like-Unlike Post")
public class LikeController {
	
	private UserService userService;
	private LikesService likeService;
	
	public LikeController(UserService userService,LikesService likeService) {
		this.userService=userService;
		this.likeService=likeService;
	}
	
	@PostMapping("/{twitId}/like")
	public ResponseEntity<LikeDto>likeTwit(
			@PathVariable Long twitId, 
			@RequestHeader("Authorization") String jwt) throws UserException, PostException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Like like =likeService.likeTwit(twitId, user);
		
		LikeDto likeDto=LikeDtoMapper.toLikeDto(like,user);
		
		return new ResponseEntity<>(likeDto,HttpStatus.CREATED);
	}
	@DeleteMapping("/{twitId}/unlike")
	public ResponseEntity<LikeDto>unlikeTwit(
			@PathVariable Long twitId, 
			@RequestHeader("Authorization") String jwt) throws UserException, PostException, LikeException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Like like =likeService.unlikeTwit(twitId, user);
		
		
		LikeDto likeDto=LikeDtoMapper.toLikeDto(like,user);
		return new ResponseEntity<>(likeDto,HttpStatus.CREATED);
	}
	
	@GetMapping("/twit/{twitId}")
	public ResponseEntity<List<LikeDto>>getAllLike(
			@PathVariable Long twitId,@RequestHeader("Authorization") String jwt) throws UserException, PostException{
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Like> likes =likeService.getAllLikes(twitId);
		
		List<LikeDto> likeDtos=LikeDtoMapper.toLikeDtos(likes,user);
		
		return new ResponseEntity<>(likeDtos,HttpStatus.CREATED);
	}


}
